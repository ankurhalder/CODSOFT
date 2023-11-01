import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, SignUp, NoPage } from "../pages";
function App() {
	return (
		<Fragment>
			<BrowserRouter>
				<Routes>
					<Route></Route>
				</Routes>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
