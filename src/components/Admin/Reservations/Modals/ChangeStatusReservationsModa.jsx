import Modal from "@/Common/Modal";
import { X } from "lucide-react";
import React from "react";

const ChangeStatusReservationModal = ({
	isOpen,
	onClose,
	onSubmit,
	selectedReservationChangeStatus,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={"Marcar turno como completado"}
		>
			<button
				type="button"
				onClick={onClose}
				className="hover:scale-125 transition-all absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
			>
				<X />
			</button>
			<p>
				¿Quieres marcar como terminado el turno{" "}
				<strong>{selectedReservationChangeStatus?.service?.name}</strong> de{" "}
				<strong>{selectedReservationChangeStatus?.clientName}</strong>?
			</p>
			<div className="flex justify-center md:justify-end gap-2 pt-4">
				<button
					type="button"
					onClick={() => onSubmit(selectedReservationChangeStatus.id)}
					className="hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all"
				>
					Marcar como completado
				</button>
			</div>
		</Modal>
	);
};

export default ChangeStatusReservationModal;
