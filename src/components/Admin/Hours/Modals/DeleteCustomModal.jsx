import Modal from "@/Common/Modal";
import { format, isValid } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";

const DeleteCustomModal = ({ isOpen, onClose, hour, onDelete }) => {
	let formattedDate = hour?.dayOfWeek;
	const parsed = new Date(`${hour?.dayOfWeek}T12:00:00`);
	if (isValid(parsed)) {
		formattedDate = format(parsed, "EEEE dd/MM/yyyy", { locale: es });
		formattedDate =
			formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Eliminar horario personalizado"
		>
			<p className="text-gray-700">
				¿Estás seguro de que querés eliminar el horario de{" "}
				<strong>{formattedDate}</strong> desde{" "}
				<strong>{hour?.startTime.slice(0, 5)}</strong> hasta{" "}
				<strong>{hour?.endTime.slice(0, 5)}</strong>?
			</p>

			<div className="flex justify-center md:justify-end gap-2 pt-4">
				<button
					type="button"
					onClick={onClose}
					className="hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-200 hover:bg-shark-300 text-md font-semibold rounded-lg transition-all"
				>
					Cancelar
				</button>
				<button
					type="button"
					onClick={() => onDelete(hour?.id)}
					className="hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all"
				>
					Eliminar
				</button>
			</div>
		</Modal>
	);
};

export default DeleteCustomModal;
