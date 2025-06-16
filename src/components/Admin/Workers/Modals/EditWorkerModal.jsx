import ErrorMessage from "@/Common/ErrorMessage";
import Modal from "@/Common/Modal";
import Input from "@/Common/Input";
import { X } from "lucide-react";
import React from "react";

const EditWorkerModal = ({
    isOpen,
    onClose,
    onSubmit,
    formData,
    handleChange,
    error
}) => {
    return(
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Editar trabajador"}
        >
            <button
				type="button"
				onClick={onClose}
				className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
			>
				<X />
			</button>
                <Input
                    label="Correo Gmail"
                    name="gmail"
                    type="email"
                    value={formData.gmail}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                />

                <Input
                    label="Teléfono"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Teléfono"
                />

                <ErrorMessage message={error} />
                
                <div className="flex justify-end gap-2">
                    <button
						type="button"
						onClick={onClose}
						className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
					>
						Cancelar
					</button>
                    <button 
                        type="button"
                        onClick={onSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Guardar cambios
                    </button>
                </div>
        </Modal>
    )
}

export default EditWorkerModal;