import Modal from "@/Common/Modal";
import React from "react";

const DeleteServiceModal = ({
    isOpen,
    onClose,
    onDelete,
    serviceToDelete
}) => {
    return(
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Eliminar servicio"
        >
            <p>
				¿Estás seguro que querés eliminar el servicio{" "}
				<strong>{serviceToDelete?.name}</strong>?
			</p>
			<div className="flex justify-end mt-4 gap-2">
				<button type="button" onClick={onClose}>
					Cancelar
				</button>
				<button type="button" onClick={() => onDelete(serviceToDelete.id)}>
					Eliminar
				</button>
			</div>
        </Modal>
    )
}

export default DeleteServiceModal;