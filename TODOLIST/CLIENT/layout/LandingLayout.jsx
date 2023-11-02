import { Fragment } from "react";
import Navbar from "../containers/Header/Navbar";
function LandingLayout({ children }) {
	return (
		<Fragment>
			<Navbar></Navbar>
			<h1 className="landing-heading">
				{" "}
				Welcome To MyToodle! Your Todo Wonderland.
			</h1>
			{children}
		</Fragment>
	);
}

export default LandingLayout;
