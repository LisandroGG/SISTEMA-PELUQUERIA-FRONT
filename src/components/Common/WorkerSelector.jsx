import React from "react";

const WorkerSelector = ({ workers, selectedWorker, onChange }) => {
	return (
		<div className="flex items-center gap-2 mb-4">
			<p>Seleccione trabajador:</p>
			<select
				name="workerId"
				value={selectedWorker}
				onChange={onChange}
				className="border rounded px-2 py-1"
			>
				<option value="">-- Seleccionar --</option>
				{workers.map((worker) => (
					<option key={worker.id} value={worker.id}>
						{worker.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default WorkerSelector;
