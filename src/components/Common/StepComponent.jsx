import FormHeader from "@/Common/FormHeader.jsx";
import React from "react";

const StepCompont = ({ children, step, stepSelected, className = "" }) => {
	return (
		<article
			aria-labelledby={step}
			className={`bg-white animate-fadeInToBottom flex flex-col gap-1 border-gray-200 border-2 p-4 rounded-3xl w-[var(--container-sm)] md:w-[var(--container-md)] ${className}`}
		>
			<FormHeader title={step} subtitle={stepSelected} />
			{children}
		</article>
	);
};

export default StepCompont;
