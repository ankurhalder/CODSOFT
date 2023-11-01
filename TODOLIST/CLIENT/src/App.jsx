import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import { SignIn, SignUp, NoPage } from "../pages";
function App() {
	return (
		<Fragment>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="*" element={<NoPage />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
