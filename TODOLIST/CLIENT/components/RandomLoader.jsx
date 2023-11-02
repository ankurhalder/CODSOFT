import {
	ChunkLoader,
	CubeLoader,
	DoubleRingLoader,
	DualBallLoader,
	LoadingSpinner,
	WedgesLoader,
} from "./index.jsx";
const loadingComponents = [
	ChunkLoader,
	CubeLoader,
	DoubleRingLoader,
	DualBallLoader,
	LoadingSpinner,
	WedgesLoader,
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
