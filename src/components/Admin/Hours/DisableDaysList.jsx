import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarX, X } from "lucide-react";
import React from "react";

const DisableDaysList = ({ disableDays, onDelete }) => {
	if (disableDays.length === 0)
		return (
			<div className="flex flex-col items-center justify-center h-80 text-gray-500 gap-2">
				<CalendarX className="w-10 h-10" />
				<p className="text-lg font-medium text-center">
					No hay dias deshabilitados registrados
				</p>
			</div>
		);

	return (
		<div className="mb-4">
			<ul className="list-none flex flex-col gap-2">
				{disableDays.map((day) => {
					const fechaValida = day?.day && isValid(parseISO(day.day));
					return (
						<div
							key={day}
							className="flex items-center justify-between font-bold"
						>
							<li>
								{fechaValida
									? format(parseISO(day.day), "EEEE dd/MM/yyyy", {
											locale: es,
										}).replace(/^./, (str) => str.toUpperCase())
									: (day?.day ?? "Fecha no disponible")}
							</li>
							<button
								type="button"
								className="hover:scale-125 cursor-pointer text-shark-500 hover:text-shark-600 transition-all"
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
