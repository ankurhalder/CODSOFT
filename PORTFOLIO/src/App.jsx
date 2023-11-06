import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Fragment>
			<BrowserRouter>
				<Routes>
					<div>
						<h1>Ankur Halder</h1>
					</div>
				</Routes>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
