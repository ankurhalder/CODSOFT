import { Fragment } from "react";
import { Navbar } from "../containers";
function Layout({ children, isMenuOpen, setMenuOpen }) {
	return (
		<Fragment>
			<Navbar isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}></Navbar>
			<div className={`${isMenuOpen ? "navbar-open" : ""}`}>{children}</div>
		</Fragment>
	);
}

export default Layout;
