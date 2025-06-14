import { X } from "lucide-react";
import React from "react";

const HourBlockForm = ({ blocks, onAdd, onRemove, onChange }) => {
	const daysOfWeek = [
		"lunes",
		"martes",
		"miércoles",
		"jueves",
		"viernes",
		"sábado",
	];

	return (
		<div className="space-y-4">
			{blocks.map((block, index) => (
				<div key={block.id} className="flex items-center gap-4">
					<select
						value={block.day}
						onChange={(e) => onChange(index, "day", e.target.value)}
						className="border p-1 rounded"
					>
						<option value="">Día</option>
						{daysOfWeek.map((day) => (
							<option key={day} value={day}>
								{day}
							</option>
						))}
					</select>
					<input
						type="time"
						value={block.start}
						onChange={(e) => onChange(index, "start", e.target.value)}
						className="border p-1 rounded"
					/>
					<span>-</span>
					<input
						type="time"
						value={block.end}
						onChange={(e) => onChange(index, "end", e.target.value)}
						className="border p-1 rounded"
					/>
					{index !== 0 && (
						<button
							type="button"
							onClick={() => onRemove(index)}
							className="text-red-600 hover:text-red-800"
						>
							<X size={18} />
						</button>
					)}
				</div>
			))}

			<button
				type="button"
				onClick={onAdd}
				className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
			>
				Agregar bloque
			</button>
		</div>
	);
};

export default HourBlockForm;
