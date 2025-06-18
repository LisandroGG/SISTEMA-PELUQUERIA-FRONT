import Modal from "@/Common/Modal";
import React from "react";

const DeleteWorkerModal = ({ isOpen, onClose, onDelete, workerToDelete }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title={"Eliminar trabajador"}>
			<p className="text-lg">
				¿Estás seguro de que quieres eliminar a {workerToDelete?.name}?
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
					onClick={() => onDelete(workerToDelete?.id)}
					className="hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all"
				>
					Eliminar
				</button>
			</div>
		</Modal>
	);
};

export default DeleteWorkerModal;
