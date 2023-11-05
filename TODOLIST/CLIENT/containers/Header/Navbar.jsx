import React, { useState, Fragment } from "react";
import RandomLoader from "../../components/RandomLoader";
import { Link } from "react-router-dom";
import { logout } from "../../functions";
function Navbar() {
	const [loading, setIsLoading] = useState(false);
	const authToken = localStorage.getItem("authToken");

	function logoutHandler() {
		setIsLoading(true);
		logout()
			.then(() => setIsLoading(false))
			.catch((error) => console.error("Error logging out:", error));
	}
	return (
		<Fragment>
			{loading && <RandomLoader />}
			<nav className="navbar">
				<div className="navbar__logo">
					<img src="/mytoodle.png" alt="mytoodle" />
					<label htmlFor="mytoddle">MyToodle</label>
				</div>
				<div className="navbar__buttons">
					{authToken ? (
						<button onClick={logoutHandler} className="navbar__signout">
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
		</Fragment>
	);
}

export default Navbar;
