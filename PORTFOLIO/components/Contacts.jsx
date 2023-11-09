function Contacts() {
	return (
		<div className="contact-container">
			<div className="contacts-container">
				<h2 className="contacts-heading">Contact Information</h2>
				<p className="contacts-email contacts-detail">
					<span className="detail-label">Email:</span>{" "}
					ankur.halder12345@gmail.com
				</p>
				<p className="contacts-phone contacts-detail">
					<span className="detail-label">Phone:</span> +91 97489 03490
				</p>
				<p className="contacts-nationality contacts-detail">
					<span className="detail-label">Nationality:</span> Indian
				</p>
				<div className="social-links-container">
					<span className="connect-label">Connect Me With:</span>
					<ul className="social-links-list">
						<li className="social-link-item">
							<a
								href="https://www.linkedin.com/in/ankur-halder-a19553188/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src="/footer/linkedin.png"
									alt="LinkedIn"
									className="social-icon"
								/>
							</a>
						</li>
						<li className="social-link-item">
							<a
								href="https://github.com/ankurhalder"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src="/footer/github.png"
									alt="Github"
									className="social-icon"
								/>
							</a>
						</li>
						<li className="social-link-item">
							<a
								href="https://www.facebook.com/ankur.roxx.9"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src="/footer/facebook.png"
									alt="Facebook"
									className="social-icon"
								/>
							</a>
						</li>
						<li className="social-link-item">
							<a
								href="https://www.instagram.com/halder_ankur/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src="/footer/instagram.png"
									alt="Instagram"
									className="social-icon"
								/>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Contacts;
