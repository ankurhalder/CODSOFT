import { Fragment } from "react";
import Navbar from "../containers/Header/Navbar";
function LandingLayout({ children }) {
	return (
		<Fragment>
			<Navbar></Navbar>
			{children}
		</Fragment>
	);
}

export default LandingLayout;
