import React, { useState } from "react";
import { signUpUser } from "../functions";
function SignUp() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [passwordError, setPasswordError] = useState("");
	const [emailError, setEmailError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validatePassword = (password) => {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return passwordRegex.test(password);
	};

	const validateEmail = (email) => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setPasswordError("Passwords do not match");
			return;
		} else if (!validatePassword(formData.password)) {
			setPasswordError(
				"Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 special character, and 1 number"
			);
			return;
		} else {
			setPasswordError("");
		}

		// Email validation
		if (!validateEmail(formData.email)) {
			setEmailError("Invalid email format");
			return;
		} else {
			setEmailError("");
		}

		try {
			// Call the signUpUser function to send the form data
			const response = await signUpUser(formData);

			// Handle the response as needed
			console.log("Sign up successful:", response);

			// You can perform any additional actions after a successful sign-up here
		} catch (error) {
			// Handle errors from the signUpUser function
			// You can display an error message or take appropriate action
			console.error("Sign up error:", error);
		}
	};

	return (
		<div className="signup-container">
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="First Name"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<input
						type="text"
						placeholder="Last Name"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<input
						type="email"
						placeholder="Email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
				</div>

				{passwordError && <p className="error-message">{passwordError}</p>}

				{emailError && <p className="error-message">{emailError}</p>}

				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignUp;
