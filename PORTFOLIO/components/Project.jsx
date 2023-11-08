import React from "react";

const Project = ({ title, date, link, description }) => {
	return (
		<div className="project">
			<h2>{title}</h2>
			<p>Date: {date}</p>
			<p>
				Link:{" "}
				<a href={link} target="_blank" rel="noopener noreferrer">
					{link}
				</a>
			</p>
			<p>{description}</p>
		</div>
	);
};

export default Project;
