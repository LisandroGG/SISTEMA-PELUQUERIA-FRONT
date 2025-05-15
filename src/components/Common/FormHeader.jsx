const FormHeader = ({ title, subtitle }) => {
	return (
		<div className="flex flex-col items-center gap-4 mt-4">
			<img
				src="/assets/logo.webp"
				alt="Logo de AF Peluquería"
				className="w-22 h-22 rounded-full"
			/>
			<div className="w-full text-center grid gap-1">
				<h1 className="font-bold text-xl text-shark-700">{title}</h1>
				<h2 className="font-medium text-md text-shark-500">{subtitle}</h2>
			</div>
		</div>
	);
};

export default FormHeader;
