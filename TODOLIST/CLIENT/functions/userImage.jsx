const updateUserImage = async (file) => {
	try {
		console.log("updateUserImage function called");
		const authToken = localStorage.getItem("token");

		if (!authToken) {
			throw new Error("Authentication token is missing.");
		}

		const formData = new FormData();
		formData.append("profileImage", file);

		const response = await fetch(
			"https://mytoodle.onrender.com/api/v1/profileImage/uploadProfileImage",
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
				body: formData,
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			console.error(errorData);
			throw new Error(errorData.message || "Image upload failed.");
		}

		const data = await response.json();
		console.log(data);

		if (data.status === "success") {
			return data.data.user.profileImage;
		} else {
			throw new Error("Image upload was not successful.");
		}
	} catch (error) {
		console.error("Image upload error:", error);
		throw error;
	}
};

const getUserProfileImage = async () => {
	try {
		const authToken = localStorage.getItem("token");

		if (!authToken) {
			throw new Error("Authentication token is missing.");
		}

		const response = await fetch(
			"https://mytoodle.onrender.com/api/v1/profileImage/getUserProfileImage",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			console.error(errorData);
			throw new Error(
				errorData.message || "Failed to fetch user profile image."
			);
		}

		const blob = await response.blob();

		if (blob.size > 0) {
			const imageUrl = URL.createObjectURL(blob);
			return imageUrl;
		} else {
			throw new Error("No image data received.");
		}
	} catch (error) {
		console.error("Error fetching user profile image:", error);
		throw error;
	}
};

export { updateUserImage, getUserProfileImage };
