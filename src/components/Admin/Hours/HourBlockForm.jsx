import InputTime from "@/Common/InputTime";
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
		"domingo",
	];

	return (
		<div className="space-y-4 grid place-content-center">
			{blocks.map((block, index) => (
				<div key={block.id} className="flex items-center gap-4">
					<select
						value={block.day}
						onChange={(e) => onChange(index, "day", e.target.value)}
						className="w-26 h-8 hover:cursor-pointer border text-center border-gray-300 rounded-lg px-2 py-1 bg-white text-shark-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-shark-500 focus:border-shark-500 transition-all"
					>
						<option value="" className="text-shark-600">
							Día
						</option>
						{daysOfWeek.map((day) => (
							<option key={day} value={day} className="text-shark-600 ">
								{day}
							</option>
						))}
					</select>
					<InputTime
						value={block.start}
						onChange={(e) => onChange(index, "start", e.target.value)}
						className=""
					/>
					<span>-</span>
					<InputTime
						value={block.end}
						onChange={(e) => onChange(index, "end", e.target.value)}
						className=""
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
