const signInUser = async (formData) => {
	try {
		const apiUrl = "http://localhost:8000/api/v1/users/login";
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
		const authToken = localStorage.setItem("authToken", data.token);
		const email = localStorage.setItem("email", data.data.user.email);
		const firstName = localStorage.setItem(
			"firstName",
			data.data.user.firstName
		);
		const lastName = localStorage.setItem("lastName", data.data.user.lastName);
		const role = localStorage.setItem("role", data.data.user.role);
		console.log("authToken:", authToken);
		console.log("email:", email);
		console.log("firstName:", firstName);
		console.log("lastName:", lastName);
		console.log("role:", role);
		return data;
	} catch (error) {
		console.error("Error signing in:", error);
		throw error;
	}
};

export default signInUser;
