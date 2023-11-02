const LoadingSpinner = () => {
	console.log("LoadingSpinner");
	return (
		<div className="universal-loader-container">
			<div className="custom-loading-spinner">
				<div className="spinner-container">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
