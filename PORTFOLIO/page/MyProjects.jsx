import { projectsData } from "../data";
import { Project } from "../components";
function MyProjects() {
	return (
		<div className="projects-page">
			<h1>Personal Projects</h1>
			{projectsData.map((project, index) => (
				<Project key={index} {...project} />
			))}
		</div>
	);
}

export default MyProjects;
