import React from "react";

const ErrorMessage = ({ message }) => {
	if (!message) return null;

	return <span className="text-red-500 text-sm pb-4 font-bold">{message}</span>;
};

export default ErrorMessage;
