import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { X } from "lucide-react";
import React from "react";

const DisableDaysList = ({ disableDays, onDelete }) => {
	if (disableDays.length === 0)
		return <p>No hay días deshabilitados para ester trabajador.</p>;

	return (
		<div className="mb-4">
			<ul className="list-disc list-inside ml-6">
				{disableDays.map((day) => {
					const fechaValida = day?.day && isValid(parseISO(day.day));
					return (
						<div key={day.id} className="flex items-center gap-2">
							<li>
								{fechaValida
									? format(parseISO(day.day), "EEEE dd/MM/yyyy", {
											locale: es,
										}).replace(/^./, (str) => str.toUpperCase())
									: (day?.day ?? "Fecha no disponible")}
							</li>
							<button
								type="button"
								className="text-red-600"
								onClick={() => onDelete(day)}
							>
								<X className="w-6 h-6" />
							</button>
						</div>
					);
				})}
			</ul>
		</div>
	);
};

export default DisableDaysList;
