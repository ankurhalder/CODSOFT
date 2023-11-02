const dotenv = require("dotenv");

const nodemailer = require("nodemailer");

dotenv.config({ path: "../config.env" });
const sendEmail = async (options) => {
	const transporter = nodemailer.createTransport({
		host: process.env.MAILTRAP_HOST,
		port: process.env.MAILTRAP_PORT,
		auth: {
			user: process.env.MAILTRAP_USER,
			pass: process.env.MAILTRAP_PASS,
		},
	});

	const mailOptions = {
		from: "Ankur Halder <ankur.halder@gmail.com>",
		to: options.email,
		subject: options.subject,
		text: options.message,
	};

	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
