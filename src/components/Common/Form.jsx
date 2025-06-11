import React from "react";

const Form = ({ onSubmit, children, className = "", title, submitText }) => {
	return (
		<form
			onSubmit={onSubmit}
			className={`bg-white flex flex-col gap-4 border-gray-200 border-2 p-4 rounded-3xl w-[var(--container-sm)] md:w-[var(--container-md)] ${className}`}
		>
			{title && <h1 className="">{title}</h1>}
			{children}
			<button
				type="submit"
				className="cursor-pointer text-white bg-shark-500 text-xl font-semibold p-2 rounded-lg hover:bg-shark-600 transition-all"
			>
				{submitText}
			</button>
		</form>
	);
};

export default Form;
