import ErrorMessage from "@/Common/ErrorMessage";
import Input from "@/Common/Input";
import Modal from "@/Common/Modal";
import { X } from "lucide-react";
import React from "react";

const CreateWorkerModal = ({
	isOpen,
	onClose,
	onSubmit,
	formData,
	handleChange,
	error,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title={"Crear nuevo trabajador"}>
			<button
				type="button"
				onClick={onClose}
				className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
			>
				<X />
			</button>
			<div>
				<Input
					label="Nombre del trabajador"
					name="name"
					type="text"
					value={formData.name}
					onChange={handleChange}
					placeholder="Nombre"
				/>

				<Input
					label="Gmail del trabajador"
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
					className="tracking-wider"
				/>

				<ErrorMessage message={error} />
				<div className="flex justify-center md:justify-end pt-4">
				<button
					type="button"
					onClick={onSubmit}
					className="px-4 py-2 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all"
				>
					Crear trabajador
				</button>
				</div>
			</div>
		</Modal>
	);
};

export default CreateWorkerModal;
