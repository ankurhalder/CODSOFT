import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
	return (
		<nav className="navbar">
			<div className="navbar__logo">
				<img src="/mytoodle.png" alt="mytoodle" />
				<label htmlFor="mytoddle">MyToodle</label>
			</div>
			<div className="navbar__menu">
				<ul className="menu__items">
					<li className="item">
						<Link to="/">Sample</Link>
					</li>
					<li className="item">
						<Link to="/signup">Sample</Link>
					</li>
				</ul>
			</div>
			<div className="navbar__buttons">
				<Link to="/">
					<button className="navbar__signin">Sign In</button>
				</Link>
				<Link to="signup">
					<button className="navbar__signup">Sign Up</button>
				</Link>
			</div>
		</nav>
	);
}
export default Navbar;
