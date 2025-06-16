import ErrorMessage from "@/Common/ErrorMessage";
import Input from "@/Common/Input";
import Modal from "@/Common/Modal";
import { X } from "lucide-react";
import React from "react";

const CreateServiceModal = ({
	isOpen,
	onClose,
	onSubmit,
	formData,
	handleChange,
	error,
	workers,
	setFormData,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title={"Crear nuevo servicio"}>
			<button
				type="button"
				onClick={onClose}
				className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
			>
				<X />
			</button>
			<div>
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
					label="Duration del servicio"
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
								checked={(formData.workerIds || []).includes(worker.id)}
								onChange={(e) => {
									const id = Number.parseInt(e.target.value);
									setFormData((prevData) => ({
										...prevData,
										workerIds: e.target.checked
											? [...prevData.workerIds, id]
											: prevData.workerIds.filter((wid) => wid !== id),
									}));
								}}
							/>
							{worker.name}
						</label>
					))}
				</div>
				<ErrorMessage message={error} />

				<button
					type="button"
					onClick={onSubmit}
					className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
				>
					Crear Servicio
				</button>
			</div>
		</Modal>
	);
};

export default CreateServiceModal;
