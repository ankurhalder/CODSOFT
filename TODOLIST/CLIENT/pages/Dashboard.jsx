import { Fragment, useEffect } from "react";
import { UserLayout } from "../layout";
function Dashboard() {
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			window.location.href = "/";
		}
	}, []);
	return (
		<Fragment>
			<UserLayout></UserLayout>
		</Fragment>
	);
}
export default Dashboard;
