import { Fragment } from "react";
import Navbar from "../containers/Header/Navbar";
function UserLayout({ children }) {
	return (
		<Fragment>
			<Navbar></Navbar>
			{children}
		</Fragment>
	);
}

export default UserLayout;
