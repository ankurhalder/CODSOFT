import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ closeMenu }) {
	return (
		<footer className="footer">
			<div className="footer__links">
				<ul>
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
			</div>
			<div className="footer__email">
				<span>Email Me At :</span>
				<a href="mailto: ankur.halder12345@gmail.com">
					{" "}
					ankur.halder12345@gmail.com
				</a>
			</div>
			<div className="footer__bottom">
				&copy; {new Date().getFullYear()} Ankur halder. All rights reserved.
			</div>
		</footer>
	);
}
