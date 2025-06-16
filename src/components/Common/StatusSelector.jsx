import React from "react";

const StatusSelector = ({ onChange, value }) => {
	return (
		<div className="flex items-center gap-2 mb-4">
			<p>Selecione estado:</p>
			<select
				name="status"
				value={value}
				onChange={onChange}
				className="border rounded px-2 py-1"
			>
				<option value="">-- Seleccionar --</option>
				<option value="confirm">Confirmados</option>
				<option value="finish">Terminados</option>
				<option value="cancel">Cancelados</option>
			</select>
		</div>
	);
};

export default StatusSelector;
