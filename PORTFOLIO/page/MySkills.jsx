import { skills } from "../data";
function MySkills() {
	return (
		<div className="skills-container">
			<h2>My Skills</h2>
			<ul className="skills-list">
				{skills.map((skill, index) => (
					<li key={index}>
						<h3>{skill.name}</h3>
						<p>{skill.description}</p>
						<em>Proficiency: {skill.level}</em>
					</li>
				))}
			</ul>
		</div>
	);
}

export default MySkills;
