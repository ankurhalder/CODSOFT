const signInUser = async (formData) => {
	try {
		console.log("Sign In function called");
		const apiUrl = "https://mytoodle.onrender.com/api/v1/users/login";
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		};

		const response = await fetch(apiUrl, requestOptions);
		// console.log("response:", response);
		if (!response.ok) {
			throw new Error("Failed to sign in. Please check your credentials.");
		}

		const data = await response.json();
		// console.log("data:", data);
		localStorage.setItem("authToken", data.token);
		localStorage.setItem("email", data.data.user.email);
		localStorage.setItem("firstName", data.data.user.firstName);
		localStorage.setItem("lastName", data.data.user.lastName);
		localStorage.setItem("role", data.data.user.role);
		console.log("authToken:", localStorage.getItem("authToken"));
		console.log("email:", localStorage.getItem("email"));
		console.log("firstName:", localStorage.getItem("firstName"));
		console.log("lastName:", localStorage.getItem("lastName"));
		console.log("role:", localStorage.getItem("role"));
		return data;
	} catch (error) {
		console.error("Error signing in:", error);
		throw error;
	}
};

export default signInUser;
