console.log("Hello from server.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB =
	"mongodb+srv://ankurhalder12345:<PASSWORD>@mytoodle.jc8pifd.mongodb.net/?retryWrites=true&w=majority".replace(
		"<PASSWORD>",
		process.env.DATABASE_PASSWORD
	);
mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const port = process.env.PORT;
const server = app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
if (process.env.NODE_ENV === "development") {
	console.log("Development Mode");
} else {
	console.log("Production Mode");
}

process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION! 💥 Shutting down...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
