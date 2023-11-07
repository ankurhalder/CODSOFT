import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	DashBoard,
	AboutMe,
	ContactMe,
	MyProjects,
	MyResume,
	MySkills,
	NoPage,
} from "../page";
import { Layout } from "../layout";
function App() {
	return (
		<Fragment>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<DashBoard></DashBoard>} />
						<Route path="*" element={<NoPage></NoPage>} />
						<Route path="/about" element={<AboutMe></AboutMe>} />
						<Route path="/contact" element={<ContactMe></ContactMe>} />
						<Route path="/projects" element={<MyProjects></MyProjects>} />
						<Route path="/resume" element={<MyResume></MyResume>} />
						<Route path="/skills" element={<MySkills></MySkills>} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</Fragment>
	);
}
export default App;
