import React from "react";

const Loading = ({ loadingText }) => {
	return (
		<div className="flex flex-col items-center">
			<img
				src="/assets/scissors-loading.svg"
				alt="Loading"
				className="w-28 mb-1"
			/>
			<p>{loadingText}</p>
		</div>
	);
};

export default Loading;
