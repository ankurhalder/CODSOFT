import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../functions";
function Navbar() {
	const authToken = localStorage.getItem("authToken");

	return (
		<nav className="navbar">
			<div className="navbar__logo">
				<img src="/mytoodle.png" alt="mytoodle" />
				<label htmlFor="mytoddle">MyToodle</label>
			</div>
			<div className="navbar__buttons">
				{authToken ? (
					<button onClick={logout} className="navbar__signout">
						Sign Out
					</button>
				) : (
					<>
						<Link to="/">
							<button className="navbar__signin">Sign In</button>
						</Link>
						<Link to="/signup">
							<button className="navbar__signup">Sign Up</button>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
