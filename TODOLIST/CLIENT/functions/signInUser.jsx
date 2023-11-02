const signInUser = async (formData) => {
	try {
		const apiUrl = "http://localhost:8000/api/v1/users/signin";
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
			throw new Error("Failed to sign in. Please check your credentials.");
		}

		const data = await response.json();
		console.log("data:", data);
		return data;
	} catch (error) {
		console.error("Error signing in:", error);
		throw error;
	}
};

export default signInUser;
