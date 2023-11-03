const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please provide your First Name"],
	},
	lastName: {
		type: String,
		required: [true, "Please provide your Last Name"],
	},
	email: {
		type: String,
		required: [true, "Please provide your Email"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please provide a valid email"],
	},
	profileImage: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ProfileImage",
	},
	todos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Todo",
		},
	],
	// !
	role: {
		type: String,
		enum: ["user", "guide", "lead-guide", "admin"],
		default: "user",
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		validate: [
			validator.isStrongPassword,
			"Please provide a strong password with minimum 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol",
		],
		select: false,
	},
	passwordConfirm: {
		type: String,
		// required: [true, "PLease Provide Correct Password"],
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	tokens: [String],
});

userSchema.pre("save", async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified("password")) return next();

	// Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	// Delete passwordConfirm field
	this.passwordConfirm = undefined;
	next();
});

userSchema.pre("save", async function (next) {
	// # if the password is not modified or the document is new
	if (!this.isModified("password") || this.isNew) return next();
	// # if the password is modified
	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	// console.log(this.passwordChangedAt);
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		// console.log(changedTimestamp, JWTTimestamp);
		return JWTTimestamp < changedTimestamp;
	}

	// False means NOT changed
	return false;
};
// # this will help us to create a token for the user to reset the password
userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");
	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");
	console.log({ resetToken }, this.passwordResetToken);

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
	return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
