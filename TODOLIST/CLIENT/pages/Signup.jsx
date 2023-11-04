import React, { useState, Fragment, useEffect } from "react";
import { LandingLayout } from "../layout";
import { signUpUser } from "../functions";
import RandomLoader from "../components/RandomLoader";
function SignUp() {
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			window.location.href = "/dashboard";
		}
	}, []);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
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
		if (formData.password !== formData.confirmPassword) {
			setPasswordError("Passwords do not match");
			setIsLoading(false);
			return;
		} else if (!validatePassword(formData.password)) {
			setPasswordError(
				"Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 special character, and 1 number"
			);
			setIsLoading(false);
			return;
		} else {
			console.log("Password is valid");
			setPasswordError("");
		}

		if (!validateEmail(formData.email)) {
			setEmailError("Invalid email format");
			setIsLoading(false);
			return;
		} else {
			console.log("Email is valid");
			setEmailError("");
		}

		try {
			console.log("formData:", formData);
			const response = await signUpUser(formData);
			console.log("Sign up successful:", response);
			alert("Sign up successful - Please login in");
			window.location.href = "/";
			setIsLoading(false);
		} catch (error) {
			console.error("Sign up error:", error);
			alert("There was an error signing up. Please Contact Support.");
			setIsLoading(false);
		}
	};

	return (
		<Fragment>
			<LandingLayout>
				{loading && <RandomLoader />}
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
			</LandingLayout>
		</Fragment>
	);
}

export default SignUp;
