import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isMenuOpen, setMenuOpen, closeMenu }) {
	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	return (
		<header>
			<nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
				<div className="menu-toggle" onClick={toggleMenu}>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
				</div>
				<div className="logo">
					<Link to="/">
						<img src="/Ankur_Halder.jpg" alt="Ankur Halder" />
					</Link>
				</div>
				<ul className="menu">
					<li>
						<Link to="/" onClick={closeMenu}>
							Home
						</Link>
					</li>
					<li>
						<Link to="/skills" onClick={closeMenu}>
							Skills
						</Link>
					</li>
					<li>
						<Link to="/projects" onClick={closeMenu}>
							Projects
						</Link>
					</li>
					<li>
						<Link to="/contact" onClick={closeMenu}>
							Contact
						</Link>
					</li>
					<li>
						<Link to="/resume" onClick={closeMenu}>
							Resume
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Navbar;
