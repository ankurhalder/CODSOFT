async function logout() {
	const authToken = localStorage.getItem("authToken");
	console.log("authToken:", authToken);
	try {
		console.log("logout function called");
		const response = await fetch(
			"https://mytoodle.onrender.com/api/v1/users/logout",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		);
		console.log("response:", response);

		if (response.status === 204) {
			localStorage.clear();
			alert("You are logged out");
		} else if (response.status === 401) {
			localStorage.clear();
			alert("You are not logged in");
		} else {
			alert("An error occurred during logout.");
		}
	} catch (error) {
		console.error("An error occurred:", error);
		alert("An error occurred during logout.");
	}
}

export default logout;
