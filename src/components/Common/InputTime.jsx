import React from "react";

const InputTime = ({ value, onChange, name, className = "", ...props }) => {
	const handleChange = (e) => {
		let input = e.target.value.replace(/\D/g, "");

		if (input.length > 4) {
			input = input.slice(0, 4);
		}

		if (input.length > 2) {
			input = `${input.slice(0, 2)}:${input.slice(2)}`;
		}

		if (input.length === 5) {
			let [hh, mm] = input.split(":").map((v) => Number.parseInt(v, 10));
			if (hh > 23) hh = 23;
			if (mm > 59) mm = 59;
			input = `${hh.toString().padStart(2, "0")}:${mm
				.toString()
				.padStart(2, "0")}`;
		}

		e.target.value = input;

		onChange(e);
	};
	return (
		<input
			type="text"
			inputMode="numeric"
			pattern="[0-9]{2}:[0-9]{2}"
			placeholder="00:00"
			name={name}
			value={value}
			onChange={handleChange}
			className={`h-8 w-20 text-center border hover:cursor-pointer border-gray-300 rounded-lg p-1 bg-white text-shark-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-shark-500 focus:border-shark-500 transition-all ${className}`}
			{...props}
		/>
	);
};

export default InputTime;
