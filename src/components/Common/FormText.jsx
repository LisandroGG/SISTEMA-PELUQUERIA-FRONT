import React from "react";
import { Link } from "react-router-dom";

const FormText = ({ text = "", linkText = "", to = "/", className = "" }) => {
	return (
		<p
			className={`font-medium text-md text-shark-500 hover:text-shark-700 transition-all ${className}`}
		>
			{text} <Link to={to}>{linkText}</Link>
		</p>
	);
};

export default FormText;
