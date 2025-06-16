import Modal from "@/Common/Modal";
import React from "react";

const DeleteWorkerModal = ({ isOpen, onClose, onDelete, workerToDelete }) => {
    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            title={"Eliminar trabajador"}
        >
        <p>¿Estás seguro de que quieres eliminar a {workerToDelete?.name}?</p>
				<div className="mt-4 flex justify-end gap-4">
					<button
						type="button"
						onClick={onClose}
						className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
					>
						Cancelar
					</button>
					<button 
                        type="button" 
                        onClick={() => onDelete(workerToDelete?.id)} 
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
						Eliminar
					</button>
				</div>
        </Modal>
    )
}

export default DeleteWorkerModal;