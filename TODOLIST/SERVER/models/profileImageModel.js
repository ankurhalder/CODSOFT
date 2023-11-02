const mongoose = require("mongoose");

const profileImageSchema = new mongoose.Schema({
	data: Buffer,
	filename: String,
});

const ProfileImage = mongoose.model("ProfileImage", profileImageSchema);

module.exports = ProfileImage;
