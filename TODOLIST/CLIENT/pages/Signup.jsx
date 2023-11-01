import React, { useState } from "react";

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

	const handleSubmit = (e) => {
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

		// You can proceed with your signup logic here
	};

	return (
		<div className="signup-container">
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						id="confirmPassword"
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
