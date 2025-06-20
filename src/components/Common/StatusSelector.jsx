import React from "react";

const StatusSelector = ({ onChange, value }) => {
	return (
		<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
			<label htmlFor="status" className="font-semibold text-shark-600">
				Seleccione estado:
			</label>
			<select
				name="status"
				value={value}
				onChange={onChange}
				className="w-full sm:w-auto border border-gray-300 rounded-xl px-4 py-2 bg-white text-shark-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-shark-500 focus:border-shark-500 transition-all"
			>
				<option value="">Estados</option>
				<option value="confirm">Confirmados</option>
				<option value="finish">Terminados</option>
				<option value="cancel">Cancelados</option>
			</select>
		</div>
	);
};

export default StatusSelector;
