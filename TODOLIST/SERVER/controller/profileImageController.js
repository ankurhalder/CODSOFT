const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ProfileImage = require("../models/profileImageModel");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("Not an image! Please upload only images.", 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadProfileImage = upload.single("profileImage");

exports.updateProfileImage = catchAsync(async (req, res, next) => {
	if (!req.file) {
		return next(new AppError("Please upload an image.", 400));
	}

	try {
		const filename = `${Date.now()}-${req.user.email}.jpeg`;

		const imageBuffer = req.file.buffer;

		const resizedImage = await sharp(imageBuffer)
			.resize(300, 300)
			.toFormat("jpeg")
			.jpeg({ quality: 90 })
			.toBuffer();

		// Create a new ProfileImage document
		const profileImage = new ProfileImage({
			data: resizedImage,
			filename: filename,
		});

		await profileImage.save(); // Save the ProfileImage document

		// Update the user's profileImage with the ID of the newly created ProfileImage document
		req.user.profileImage = profileImage._id;

		await req.user.save();

		res.status(200).json({
			status: "success",
			data: {
				user: req.user,
			},
		});
	} catch (error) {
		return next(new AppError("Error processing the image.", 500));
	}
});

exports.getUserProfileImage = catchAsync(async (req, res, next) => {
	const profileImageId = req.user.profileImage;

	if (!profileImageId) {
		return next(new AppError("User profile image not found", 404));
	}

	const profileImage = await ProfileImage.findById(profileImageId);

	if (!profileImage) {
		return next(new AppError("User profile image not found", 404));
	}

	res.set("Content-Type", "image/jpeg");
	res.set("Content-Disposition", `inline; filename="${profileImage.filename}"`);

	res.send(profileImage.data);
});
