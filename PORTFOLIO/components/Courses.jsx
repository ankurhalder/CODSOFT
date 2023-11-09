import React from "react";
import { courseData } from "../data";

const Courses = () => {
	return (
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
						<p className="resume-course-description">{course.description}</p>
					)}
				</div>
			))}
		</div>
	);
};

export default Courses;
