import React from "react";
import courseData from "../data/courses";

function DashBoard() {
	const downloadCV = () => {
		const cvLink = "/CV.pdf";
		window.open(cvLink, "_blank");
	};

	return (
		<div className="dashboard-container">
			<div className="profile-section">
				<img
					src="/Ankur_Halder.jpg"
					alt="Ankur Halder"
					className="profile-pic"
				/>
				<div className="bio">
					<h2 className="name">Ankur Halder</h2>
					<p className="info">Male | 23 years old</p>

					<div className="personal-details">
						<h3>Personal Details</h3>
						<p>
							<strong>Date of Birth:</strong> 30/05/2001
						</p>
						<p>
							<strong>Gender:</strong> Male
						</p>
						<p>
							<strong>Languages Known:</strong> Bengali, Hindi, English
						</p>
						<p>
							<strong>Address:</strong> 13R Ishan Ghosh Road, Kolkata: 700008,
							West Bengal, India
						</p>
					</div>

					<div className="intro">
						<p>
							Hello! I'm Ankur Halder, a passionate computer science student
							with a deep love for technology and web development. Currently
							pursuing my B.Tech in Computer Science, I am on a journey to
							explore the vast world of MERN stack and beyond.
						</p>
					</div>

					<div className="education">
						<h3>Education</h3>
						<p>
							<strong>B.Tech, Computer Science</strong>
							<br />
							University Of Engineering & Management, New Town
							<br />
							Currently Pursuing (Expected Graduation: 2025)
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
							<div key={index} className="course-item">
								<p>
									<strong className="course-title">{course.title}</strong>
								</p>
								<p className="course-institution">{course.institution}</p>
								<p className="course-duration">{course.duration}</p>
								<p className="course-certificate">
									Certificate Credential:
									<a href={course.certificateLink}>Link</a>
								</p>
								{course.credentialID && (
									<p className="course-credential">
										Credential ID: {course.credentialID}
									</p>
								)}
								{course.skills && (
									<p className="course-skills">
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
									<p className="course-description">{course.description}</p>
								)}
							</div>
						))}
					</div>

					<button onClick={downloadCV} className="download-cv-btn">
						Download CV
					</button>
				</div>
			</div>
		</div>
	);
}

export default DashBoard;
