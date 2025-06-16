import ErrorMessage from "@/Common/ErrorMessage";
import Modal from "@/Common/Modal";
import Input from "@/Common/Input";
import { X } from "lucide-react";
import React from "react";

const EditServiceModal = ({
    isOpen,
    onClose,
    onSubmit,
    formData,
    handleChange,
    error,
    workers,
    setFormData,
}) => {
    return(
        <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Editar servicio"
    >
            <button
                type="button"
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
            >
                <X />
            </button>
        <Input
            label="Nombre del servicio"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
        />
        <Input
            label="Costo del servicio"
            name="cost"
            type="number"
            value={formData.cost}
            onChange={handleChange}
        />
        <Input
            label="Duración del servicio"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
        />

        <div className="mb-4">
						<p>Asignar trabajadores:</p>
						{workers?.map((worker) => (
							<label key={worker.id} className="flex items-center gap-2 my-1">
								<input
									type="checkbox"
									value={worker.id}
									checked={formData.workerIds.includes(worker.id)}
									onChange={(e) => {
										const id = Number.parseInt(e.target.value);
										setFormData((prev) => ({
											...prev,
											workerIds: e.target.checked
												? [...prev.workerIds, id]
												: prev.workerIds.filter((wid) => wid !== id),
										}));
									}}
								/>
								{worker.name}
							</label>
						))}
					</div>

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

export default EditServiceModal;