import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav className="navbar">
			<div className="logo">
				<img
					className="logo-image"
					src="/Ankur_Halder.jpg"
					alt="Ankur Halder"
				/>
			</div>
			<ul className="nav-links">
				<li className="nav-item">
					<Link to="/" className="nav-link">
						Home
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/about" className="nav-link">
						About
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/contact" className="nav-link">
						Contact
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/projects" className="nav-link">
						Projects
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/resume" className="nav-link">
						Resume
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/skills" className="nav-link">
						Skills
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
