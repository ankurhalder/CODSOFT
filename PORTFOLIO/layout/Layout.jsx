import { Fragment } from "react";
import { Navbar } from "../containers";
function Layout({ children }) {
	return (
		<Fragment>
			<Navbar></Navbar>
			{children}
		</Fragment>
	);
}

export default Layout;
