const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const userRouter = require("./routes/userRoutes");
const profileImageRouter = require("./routes/profileImageRoutes");
const todoRouter = require("./routes/todoRoutes");
const app = express();

app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"https://mytoodle.netlify.app/",
			"https://mytoodle.netlify.app",
			"http://localhost:3001",
			"http://localhost:5173",
		],
		methods: "GET,POST,PUT,DELETE,PATCH,UPDATE,HEAD",
		allowedHeaders:
			"Origin, X-Requested-With, Content-Type, Accept, Authorization",
		credentials: true,
	})
);

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	// console.log(req.headers);
	next();
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/profileImage", profileImageRouter);
app.use("/api/v1/", todoRouter);
app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
