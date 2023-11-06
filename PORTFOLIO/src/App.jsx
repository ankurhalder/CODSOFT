/* eslint-disable no-unused-vars */
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
function App() {
	return (
		<Fragment>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={DashBoard} />
					<Route path="*" element={NoPage} />
				</Routes>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
