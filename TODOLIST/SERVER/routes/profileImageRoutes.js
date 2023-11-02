const express = require("express");
const profileImageController = require("../controller/profileImageController");
const authController = require("../controller/authController");

const router = express.Router();

// Upload profile image
router.patch(
	"/uploadProfileImage",
	authController.protect,
	profileImageController.uploadProfileImage,
	profileImageController.updateProfileImage
);

// Get user profile image
router.get(
	"/getUserProfileImage",
	authController.protect,
	profileImageController.getUserProfileImage
);

module.exports = router;
