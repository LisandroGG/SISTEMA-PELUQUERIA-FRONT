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
		<div className="space-y-4 grid place-content-center">
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
							className="hover:scale-125 cursor-pointer text-shark-500 hover:text-shark-600 transition-all"
						>
							<X className="w-6 h-6" />
						</button>
					)}
				</div>
			))}
		</div>
	);
};

export default HourBlockForm;
