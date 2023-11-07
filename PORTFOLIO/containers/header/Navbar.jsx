import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav>
			<div className="logo">
				<img src="/Ankur_Halder.jpg" alt="Ankur Halder" />
			</div>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
				<li>
					<Link to="/projects">Projects</Link>
				</li>
				<li>
					<Link to="/resume">Resume</Link>
				</li>
				<li>
					<Link to="/skills">Skills</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
