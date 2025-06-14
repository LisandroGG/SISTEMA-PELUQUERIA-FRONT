import { format, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { Pencil, X } from "lucide-react";
import React from "react";

const CustomHoursList = ({ customHours, onEdit, onDelete }) => {
	if (customHours.length === 0)
		return <p>No hay horarios personalizados para este trabajador.</p>;

	const grouped = customHours.reduce((acc, hour) => {
		if (!acc[hour.dayOfWeek]) acc[hour.dayOfWeek] = [];
		acc[hour.dayOfWeek].push(hour);
		return acc;
	}, {});

	return Object.entries(grouped).map(([date, hours]) => {
		let formattedDate = date;
		const parsed = new Date(`${date}T12:00:00`);
		if (isValid(parsed)) {
			formattedDate = format(parsed, "EEEE dd/MM/yyyy", { locale: es });
			formattedDate =
				formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
		}

		return (
			<div key={date} className="mb-4">
				<p className="font-bold capitalize">{formattedDate}:</p>
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
		);
	});
};

export default CustomHoursList;
