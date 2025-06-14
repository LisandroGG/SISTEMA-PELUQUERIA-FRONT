import { Pencil, X } from "lucide-react";
import React from "react";

const WeeklyHoursList = ({ workingHours, onEdit, onDelete }) => {
	if (workingHours.length === 0)
		return <p>No hay horarios semanales para este trabajador.</p>;

	const grouped = workingHours.reduce((acc, hour) => {
		if (!acc[hour.dayOfWeek]) acc[hour.dayOfWeek] = [];
		acc[hour.dayOfWeek].push(hour);
		return acc;
	}, {});

	return Object.entries(grouped).map(([day, hours]) => (
		<div key={day} className="mb-4">
			<p className="font-bold capitalize">{day}:</p>
			<ul className="list-disc list-inside ml-6">
				{hours.map((hour) => (
					<div key={hour.id} className="flex items-center gap-2">
						<li>
							{hour.startTime?.slice(0, 5)} - {hour.endTime?.slice(0, 5)}
						</li>
						<button
							type="button"
							className="text-blue-600"
							onClick={() => onEdit(hour)}
						>
							<Pencil className="w-5 h-5" />
						</button>
						<button
							type="button"
							className="text-red-600"
							onClick={() => onDelete(hour)}
						>
							<X className="w-6 h-6" />
						</button>
					</div>
				))}
			</ul>
		</div>
	));
};

export default WeeklyHoursList;
