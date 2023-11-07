import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ closeMenu }) {
	return (
		<footer className="footer">
			<div className="footer-links">
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
			<div className="footer-social">
				<ul>
					<li>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src="/footer/linkedin.png" alt="LinkedIn" />
						</a>
					</li>
					<li>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src="/footer/facebook.png" alt="Facebook" />
						</a>
					</li>
					<li>
						<a
							href="https://www.instagram.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src="/footer/instagram.png" alt="Instagram" />
						</a>
					</li>
				</ul>
			</div>
			<div className="footer-bottom">
				&copy; {new Date().getFullYear()} Ankur halder. All rights reserved.
			</div>
		</footer>
	);
}
