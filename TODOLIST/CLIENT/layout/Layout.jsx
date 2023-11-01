import { Fragment } from "react";
import { Navbar } from "../containers";
const Layout = ({ children }) => {
	return (
		<Fragment>
			<Navbar />
			{children}
		</Fragment>
	);
};

export default Layout;
