import React from "react";

function Navbar() {
	return (
		<nav className="navbar">
			<div className="navbar__logo">
				<img src="/mytoodle.png" alt="mytoodle" />
				<label htmlFor="mytoddle">MyToodle</label>
			</div>
			<div className="navbar__menu">
				<ul className="menu__items">
					<li></li>
				</ul>
			</div>
			<div className="navbar__buttons">
				<button className="navbar__login">Login</button>
				<button className="navbar__signup">Sign Up</button>
			</div>
		</nav>
	);
}

export default Navbar;
