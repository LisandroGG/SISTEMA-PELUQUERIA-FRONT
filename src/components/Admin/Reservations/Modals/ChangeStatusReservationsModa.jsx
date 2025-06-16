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
                            className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
                        >
                            <X />
                        </button>
            <p>¿Quieres marcar como completado el turno de {selectedReservationChangeStatus.id}?</p>
				<button
					type="button"
					onClick={() => onSubmit(selectedReservationChangeStatus.id)}
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
				>
					Marcar como completado
				</button>
        </Modal>
    )
}

export default ChangeStatusReservationModal;