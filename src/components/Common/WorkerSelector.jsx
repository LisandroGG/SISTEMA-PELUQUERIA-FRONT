import React from "react";

const WorkerSelector = ({ workers, selectedWorker, onChange }) => {
	return (
		<div className="flex flex-col lg:flex-row items-center gap-2 mb-6">
			<label htmlFor="workerId" className="font-semibold text-shark-600">
				Trabajador:
			</label>
			<select
				id="workerId"
				name="workerId"
				value={selectedWorker}
				onChange={onChange}
				className="w-full border text-center border-gray-300 rounded-xl px-4 py-2 bg-white text-shark-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-shark-500 focus:border-shark-500 transition-all"
			>
				<option value="">Trabajadores</option>
				{workers.map((worker) => (
					<option key={worker.id} value={worker.id} className="text-shark-600">
						{worker.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default WorkerSelector;
