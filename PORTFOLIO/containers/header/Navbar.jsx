import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isMenuOpen, setMenuOpen }) {
	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
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
					<Link to="/" onClick={closeMenu}>
						Home
					</Link>
				</li>
				<li>
					<Link to="/about" onClick={closeMenu}>
						About
					</Link>
				</li>
				<li>
					<Link to="/contact" onClick={closeMenu}>
						Contact
					</Link>
				</li>
				<li>
					<Link to="/projects" onClick={closeMenu}>
						Projects
					</Link>
				</li>
				<li>
					<Link to="/resume" onClick={closeMenu}>
						Resume
					</Link>
				</li>
				<li>
					<Link to="/skills" onClick={closeMenu}>
						Skills
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
