import { Pencil, X, CalendarDays  } from "lucide-react";
import React from "react";

const WeeklyHoursList = ({ workingHours, onEdit, onDelete }) => {
	if (workingHours.length === 0)
		return (
	<div className="flex flex-col items-center justify-center h-80 text-gray-500 gap-2">
					<CalendarDays className="w-10 h-10" />
					<p className="text-lg font-medium text-center">
						No hay horarios semanales registrados
					</p>
				</div>)

	const grouped = workingHours.reduce((acc, hour) => {
		if (!acc[hour.dayOfWeek]) acc[hour.dayOfWeek] = [];
		acc[hour.dayOfWeek].push(hour);
		return acc;
	}, {});

	return Object.entries(grouped).map(([day, hours]) => (
		<div key={day} className="mb-4">
			<p className="font-bold capitalize">{day}:</p>
			<ul className="list-none">
				{hours.map((hour) => (
					<div key={hour.id} className="flex items-center justify-between">
						<li>
							{hour.startTime?.slice(0, 5)} - {hour.endTime?.slice(0, 5)}
						</li>
						<div className="flex items-center gap-2">
						<button
							type="button"
							className="hover:scale-125 cursor-pointer text-shark-500 hover:text-shark-600 transition-all"
							onClick={() => onEdit(hour)}
						>
							<Pencil className="w-5 h-5" />
						</button>
						<button
							type="button"
							className="hover:scale-125 cursor-pointer text-shark-500 hover:text-shark-600 transition-all"
							onClick={() => onDelete(hour)}
						>
							<X className="w-6 h-6" />
						</button>
						</div>
					</div>
				))}
			</ul>
		</div>
	));
};

export default WeeklyHoursList;
