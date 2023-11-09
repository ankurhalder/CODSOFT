import courseData from "../data/courses";
function DashBoard() {
	const downloadCV = () => {
		const cvLink = "/CV.pdf";
		window.open(cvLink, "_blank");
	};
	return (
		<div className="about-me-section">
			<img src="/Ankur_Halder.jpg" alt="Ankur Halder" className="profile-pic" />
			<div className="bio">
				<h2>Your Name</h2>
				<p>
					Hi there! I'm a passionate [Your Role] with a love for [Your Field].
					My journey in the industry has been an exciting ride, filled with
					challenges and triumphs.
				</p>
				<p>
					I specialize in [Your Skills], bringing [X] years of experience to the
					table. Whether it's [Specific Skill 1], [Specific Skill 2], or
					[Specific Skill 3], I thrive on turning ideas into reality.
				</p>
				<p>
					My mission is to [Your Mission Statement]. I believe in the power of
					[Your Core Beliefs] and am dedicated to [Your Goal].
				</p>
				<div className="education">
					<h3>Education</h3>
					<p>
						<strong>B.Tech, Computer Science</strong>
						<br />
						University Of Engineering & Management, New Town
						<br />
						2021 - 2025
					</p>
					<p>
						<strong>Senior Secondary (XII), Science</strong>
						<br />
						SHRI RITAM VIDYAPITH (WBCHSE board)
						<br />
						Year of completion: 2021
						<br />
						Percentage: 76.60%
					</p>
					<p>
						<strong>Secondary (X)</strong>
						<br />
						Behala Aryya Vidyamandir (WBBSE board)
						<br />
						Year of completion: 2017
						<br />
						Percentage: 85.70%
					</p>
				</div>
				<div className="resume-section">
					<h2 className="resume-section-heading">Trainings/Courses</h2>
					{courseData.map((course, index) => (
						<div key={index}>
							<p>
								<strong className="resume-course-title">{course.title}</strong>
							</p>
							<p className="resume-course-institution">{course.institution}</p>
							<p className="resume-course-duration">{course.duration}</p>
							<p className="resume-course-certificate">
								Certificate Credential:
								<a href={course.certificateLink}>Link</a>
							</p>
							{course.credentialID && (
								<p className="resume-course-credential">
									Credential ID: {course.credentialID}
								</p>
							)}
							{course.skills && (
								<p className="resume-course-skills">
									Skilled through this course:
									<br />
									{course.skills.map((skill, skillIndex) => (
										<span key={skillIndex}>
											{skill}
											<br />
										</span>
									))}
								</p>
							)}
							{course.description && (
								<p className="resume-course-description">
									{course.description}
								</p>
							)}
						</div>
					))}
				</div>
				<button onClick={downloadCV}>Download CV</button>
			</div>
		</div>
	);
}

export default DashBoard;
