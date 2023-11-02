function signup() {
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const passwordConfirm = document.getElementById("passwordConfirm").value;
	const role = document.getElementById("role").value;
	const data = {
		name,
		email,
		password,
		passwordConfirm,
		role,
	};
	fetch("http://localhost:3000/api/v1/users/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((res) => {
			console.log(res);
			if (res.status === 201) {
				alert("User created successfully");
			} else {
				alert("Error");
			}
		})
		.catch((err) => {
			console.log(err);
		});
}
module.exports = signup;
