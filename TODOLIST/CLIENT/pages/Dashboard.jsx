import { Fragment, useEffect } from "react";
import { UserLayout } from "../layout";
function Dashboard() {
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			window.location.href = "/";
		}
	}, []);
	// console.log("authToken:", localStorage.getItem("authToken"));
	const email = localStorage.getItem("email");
	const firstName = localStorage.getItem("firstName");
	const lastName = localStorage.getItem("lastName");
	const role = localStorage.getItem("role");
	console.log("email:", email);
	console.log("firstName:", firstName);
	console.log("lastName:", lastName);
	console.log("role:", role);
	return (
		<Fragment>
			<UserLayout>
				<div>
					<h1>welcome </h1>
				</div>
			</UserLayout>
		</Fragment>
	);
}
export default Dashboard;
