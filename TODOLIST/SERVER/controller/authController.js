const crypto = require("crypto");
const { promisify } = require("util");

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

const signToken = (id) =>
	jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user: user,
		},
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	// const newUser = await User.create(req.body);
	const newUser = await User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
	});

	createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email and password exist
	if (!email || !password) {
		return next(new AppError("Please provide email and password!", 400));
	}

	// 2) Check if user exists && password is correct
	const user = await User.findOne({ email }).select("+password");
	// const correct = await user.correctPassword(password, user.password);

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError("Incorrect email or password", 401));
	}
	// 3) If everything is okay, fetch the user's complete data
	const completeUser = await User.findById(user._id); // Fetch the user's complete data

	// Add the code here to generate and save the new token and then send it in the response
	const token = signToken(completeUser._id);
	completeUser.tokens.push(token);
	await completeUser.save();
	createSendToken(completeUser, 200, res);
});
exports.logout = catchAsync(async (req, res) => {
	req.user.tokens = []; // Clear the tokens array
	await req.user.save();
	res.status(204).json(); // Respond with a success status (204 No Content)
});

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Getting token and check if it's there
	//# To give the user access to protected routes, we need to send along a valid JWT. We'll do this by setting the Authorization header to a value starting with Bearer. The token will be sent along with every request to the server.
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];

		if (!token) {
			return next(
				new AppError("You are not logged in! Please log in to get access.", 401)
			);
		}
	}
	// 2) Varification token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	// console.log(decoded);

	// 3) Check if user still exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError(
				"The user belonging to this token does no longer exist.",
				401
			)
		);
	}
	// 4) Check if user changed password after the token was issued
	currentUser.changedPasswordAfter(decoded.iat);
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(
			new AppError("User recently changed password! Please log in again.", 401)
		);
	}
	console.log("verified user");
	//! grant access to protected route
	req.user = currentUser;
	next();
});

exports.restrictTo =
	(...roles) =>
	(req, res, next) => {
		// roles ['admin', 'lead-guide'] role='user'
		// console.log(req.user.role);
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError("You do not have permission to perform this action.", 403)
			);
		}
		next();
	};

exports.forgotPassword = catchAsync(async (req, res, next) => {
	// 1) Get user based on POSTed email
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError("There is no user with email address.", 404));
	}
	// 2) Generate the random reset token
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });
	// 3) Send it to user's email
	const resetURL = `${req.protocol}://${req.get(
		"host"
	)}/api/v1/users/resetPassword/${resetToken}`;
	const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

	try {
		await sendEmail({
			email: user.email,
			subject: "Your password reset token (valid for 10min)",
			message,
		});

		res.status(200).json({
			status: "success",
			message: "Token sent to email!",
		});
	} catch (error) {
		// console.log(error);
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });
		// console.log(error);
		return next(
			new AppError("There was an error sending the email. Try again later!"),
			500
		);
	}
});
exports.resetPassword = catchAsync(async (req, res, next) => {
	//  1) Get user based on the token
	const hashedToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");
	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});
	//  2) If token has not expired, and there is user, set the new password
	if (!user) {
		return next(new AppError("Token is invalid or has expired", 400));
	}
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	//  3) Update changedPasswordAt property for the user
	//  4) Log the user in, send JWT
	createSendToken(User, 200, res);
});

// # Update Password

exports.updatePassword = catchAsync(async (req, res, next) => {
	// 1) Get user from collection
	const user = await User.findById(req.user.id).select("+password");

	// 2) Check if POSTed current password is correct
	if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
		// console.log('not correct');
		return next(new AppError("Your current password is wrong.", 401));
	}
	// 3) If so, update password
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();
	// User.findByIdAndUpdate will NOT work as intended!
	// 4) Log user in, send JWT
	createSendToken(User, 200, res);
});
