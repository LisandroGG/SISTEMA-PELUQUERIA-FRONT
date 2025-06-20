import ErrorMessage from "@/Common/ErrorMessage";
import Modal from "@/Common/Modal";
import { X } from "lucide-react";
import React from "react";
import HourBlockForm from "../HourBlockForm";

const CreateWeeklyModal = ({
	isOpen,
	onClose,
	workerName,
	blocks,
	onAddBlock,
	onRemoveBlock,
	onChangeBlock,
	onSubmit,
	error,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={`Crear horarios de: ${workerName}`}
		>
			<button
				type="button"
				onClick={onClose}
				className="hover:scale-125 transition-all absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
			>
				<X />
			</button>
			<HourBlockForm
				blocks={blocks}
				onAdd={onAddBlock}
				onRemove={onRemoveBlock}
				onChange={onChangeBlock}
			/>
			<ErrorMessage message={error} />
			<div className="flex justify-center md:justify-end gap-2 pt-4">
				<button
				type="button"
				onClick={onAddBlock}
				className="hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-200 hover:bg-shark-300 text-md font-semibold rounded-lg transition-all"
			>
				Agregar día
			</button>
				<button
					type="button"
					onClick={onSubmit}
					className="hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all"
				>
					Crear horarios
				</button>
			</div>
		</Modal>
	);
};

export default CreateWeeklyModal;
