const logoutUser = async () => {
	try {
		console.log("Logout function called");
		const authToken = localStorage.getItem("authToken");

		if (authToken) {
			const apiUrl = "https://mytoodle.onrender.com/api/v1/users/logout";
			const requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			};

			const response = await fetch(apiUrl, requestOptions);

			if (!response.ok) {
				throw new Error("Failed to log out. Please try again.");
			}

			const data = await response.json();

			console.log("Logout successful:", data);

			localStorage.removeItem("authToken");
			localStorage.removeItem("email");
			localStorage.removeItem("firstName");
			localStorage.removeItem("lastName");
			localStorage.removeItem("role");

			window.location.href = "/";
			return data;
		} else {
			console.error("No authentication token found. User is not logged in.");
		}
	} catch (error) {
		console.error("Error logging out:", error);
		throw error;
	}
};

export default logoutUser;
