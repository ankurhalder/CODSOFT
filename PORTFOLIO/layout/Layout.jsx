import { Fragment } from "react";
import { Navbar } from "../containers";
function Layout({ children, isMenuOpen, setMenuOpen }) {
	const closeMenu = () => {
		setMenuOpen(false);
	};
	return (
		<Fragment>
			<Navbar
				isMenuOpen={isMenuOpen}
				setMenuOpen={setMenuOpen}
				closeMenu={closeMenu}
			></Navbar>
			<div className={`${isMenuOpen ? "navbar-open" : ""}`}>{children}</div>
		</Fragment>
	);
}

export default Layout;
