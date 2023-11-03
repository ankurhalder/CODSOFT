const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	priority: {
		type: String,
		enum: ["low", "medium", "high"],
		default: "medium",
	},
	author: {
		type: String,
	},
});

todoSchema.pre("save", async function (next) {
	const user = await mongoose.model("User").findById(this.user);
	this.author = user.firstName + " " + user.lastName;
	next();
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
