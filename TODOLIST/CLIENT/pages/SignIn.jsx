import React, { useState, Fragment } from "react";
import { LandingLayout } from "../layout";
import { signInUser } from "../functions";
import RandomLoader from "../components/RandomLoader";
function SignIn() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [passwordError, setPasswordError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [loading, setIsLoading] = useState(false);
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
		setIsLoading(true);
		if (!validatePassword(formData.password)) {
			setPasswordError(
				"Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 special character, and 1 number"
			);
			setIsLoading(false);
			return;
		} else {
			setPasswordError("");
			console.log("Password is valid");
		}

		if (!validateEmail(formData.email)) {
			setEmailError("Invalid email format");
			setIsLoading(false);
			return;
		} else {
			setEmailError("");
			console.log("Email is valid");
		}

		try {
			console.log("formData:", formData);
			const response = await signInUser(formData);

			console.log("Sign in successful:", response);
			// setIsLoading(false);
		} catch (error) {
			console.error("Sign in error:", error);
			setIsLoading(false);
		}
	};

	return (
		<Fragment>
			<LandingLayout>
				{loading && <RandomLoader />}
				<div className="signin-container">
					<h2>Sign In</h2>
					<form onSubmit={handleSubmit}>
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

						{passwordError && <p className="error-message">{passwordError}</p>}
						{emailError && <p className="error-message">{emailError}</p>}
						<button type="submit">Sign In</button>
					</form>
				</div>
			</LandingLayout>
		</Fragment>
	);
}

export default SignIn;
