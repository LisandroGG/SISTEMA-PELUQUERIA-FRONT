import ErrorMessage from "@/Common/ErrorMessage";
import Input from "@/Common/Input";
import Modal from "@/Common/Modal";
import { X } from "lucide-react";
import React from "react";

const EditWorkerModal = ({
	isOpen,
	onClose,
	onSubmit,
	formData,
	handleChange,
	error,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title={"Editar trabajador"}>
			<button
				type="button"
				onClick={onClose}
				className="hover:scale-125 transition-all absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
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
				className="tracking-wider"
			/>

			<ErrorMessage message={error} />

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
					onClick={onSubmit}
					className="hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all"
				>
					Guardar
				</button>
			</div>
		</Modal>
	);
};

export default EditWorkerModal;
