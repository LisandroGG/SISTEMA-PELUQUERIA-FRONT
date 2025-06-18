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
				className="hover:scale-125 transition-all absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
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

				<div className="mb-4 mt-4">
					<p className="mb-2">Asignar trabajadores:</p>
					<div className="flex flex-wrap gap-2">
						{workers?.map((worker) => {
							const isSelected = (formData.workerIds || []).includes(worker.id);
							return (
								<label
									key={worker.id}
									htmlFor={`worker-${worker.id}`}
									className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium border transition-all select-none
            ${isSelected ? "bg-shark-500 text-white border-shark-500" : "bg-white text-shark-500 border-shark-500 hover:bg-shark-100"}`}
								>
									<input
										id={`worker-${worker.id}`}
										type="checkbox"
										value={worker.id}
										checked={isSelected}
										onChange={(e) => {
											const id = Number.parseInt(e.target.value);
											setFormData((prevData) => ({
												...prevData,
												workerIds: e.target.checked
													? [...prevData.workerIds, id]
													: prevData.workerIds.filter((wid) => wid !== id),
											}));
										}}
										className="hidden"
									/>
									<span className="font-semibold">{worker.name}</span>
								</label>
							);
						})}
					</div>
				</div>
				<ErrorMessage message={error} />
				<div className="flex justify-center md:justify-end pt-4">
					<button
						type="button"
						onClick={onSubmit}
						className="hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all"
					>
						Crear Servicio
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default CreateServiceModal;
