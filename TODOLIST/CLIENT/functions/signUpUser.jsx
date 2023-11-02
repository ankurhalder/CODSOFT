const signUpUser = async (formData) => {
	try {
		const apiUrl = "http://localhost:8000/api/v1/users/signup";
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		};

		const response = await fetch(apiUrl, requestOptions);

		if (!response.ok) {
			// Handle server-side errors here, e.g., show an error message
			throw new Error("Failed to sign up. Please try again.");
		}

		// Parse the response if needed
		const data = await response.json();

		// You can return any response data you need
		return data;
	} catch (error) {
		// Handle network errors, exceptions, or unexpected issues
		console.error("Error signing up:", error);
		throw error;
	}
};

export default signUpUser;
