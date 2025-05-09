import React from "react";

const Form = ({ onSubmit, children, className = "", title, submitText }) => {
	return (
		<form onSubmit={onSubmit} className={` ${className}`}>
			{title && <h1 className="">{title}</h1>}
			{children}
			<button type="submit" className="cursor-pointer">
				{submitText}
			</button>
		</form>
	);
};

export default Form;
