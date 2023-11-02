import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, SignUp, NoPage } from "../pages";
function App() {
	return (
		<Fragment>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="*" element={<NoPage />} />
				</Routes>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
