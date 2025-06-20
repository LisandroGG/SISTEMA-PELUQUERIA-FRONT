import Modal from "@/Common/Modal";
import React from "react";

const DeleteWeeklyModal = ({ isOpen, onClose, hour, onDelete }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Eliminar horario semanal">
			<p className="text-gray-700">
				¿Estás seguro de que querés eliminar el horario de{" "}
				<strong>{hour?.dayOfWeek}</strong> desde{" "}
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

export default DeleteWeeklyModal;
