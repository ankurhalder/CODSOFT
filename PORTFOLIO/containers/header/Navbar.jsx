import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isMenuOpen, setMenuOpen }) {
	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	return (
		<nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
			<div className="menu-toggle" onClick={toggleMenu}>
				<div className="bar"></div>
				<div className="bar"></div>
				<div className="bar"></div>
			</div>
			<div className="logo">
				<img src="/Ankur_Halder.jpg" alt="Ankur Halder" />
			</div>
			<ul className="menu">
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
