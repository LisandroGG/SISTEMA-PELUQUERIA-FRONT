import React from "react";

const Loading = ({ loadingText }) => {
	return (
		<div className="flex flex-col items-center">
			<img src="/assets/loading.gif" alt="Loading gif" className="w-14 pb-4" />
			<p>{loadingText}</p>
		</div>
	);
};

export default Loading;
