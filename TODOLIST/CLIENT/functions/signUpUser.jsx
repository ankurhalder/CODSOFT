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
		console.log("response:", response);
		if (!response.ok) {
			throw new Error("Failed to sign up. Please try again.");
		}

		const data = await response.json();
		console.log("data:", data);
		return data;
	} catch (error) {
		console.error("Error signing up:", error);
		throw error;
	}
};
export default signUpUser;
