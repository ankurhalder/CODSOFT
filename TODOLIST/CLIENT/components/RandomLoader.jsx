import {
	ChunkLoader,
	CubeLoader,
	DualBallLoader,
	LoadingSpinner,
} from "./index.jsx";
const loadingComponents = [
	ChunkLoader,
	CubeLoader,
	DualBallLoader,
	LoadingSpinner,
];
const RandomLoader = () => {
	const randomIndex = Math.floor(Math.random() * loadingComponents.length);

	const SelectedLoader = loadingComponents[randomIndex];

	return (
		<div>
			<SelectedLoader />
		</div>
	);
};

export default RandomLoader;
