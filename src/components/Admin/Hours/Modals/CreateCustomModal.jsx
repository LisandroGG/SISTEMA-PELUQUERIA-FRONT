import ErrorMessage from "@/Common/ErrorMessage";
import Modal from "@/Common/Modal";
import SimpleDatePicker from "@/Common/SimpleDayPicker";
import { format } from "date-fns";
import { X } from "lucide-react";
import React, { useState } from "react";

const CreateCustomModal = ({
	isOpen,
	onClose,
	onSubmit,
	formData,
	onChange,
	workerName,
	error,
}) => {
	const [selectedDate, setSelectedDate] = useState(
		formData.dayOfWeek ? new Date(formData.dayOfWeek) : undefined,
	);

	const handleSelectDate = (date) => {
		if (!date) return;

		setSelectedDate(date);
		const formatted = format(date, "yyyy-MM-dd");

		onChange({ target: { name: "dayOfWeek", value: formatted } });
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={`Crear horario personalizado de: ${workerName}`}
		>
			<button
				type="button"
				onClick={onClose}
				className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
			>
				<X />
			</button>

			<div className="space-y-4 mt-2">
				<div className="flex flex-col gap-2 items-center">
					<label htmlFor="Fecha" className="text-lg">
						Seleccione una día:
					</label>
					<div className="grid place-content-center mt-2 flex-col gap-4">
						<SimpleDatePicker
							selectedDate={selectedDate}
							onSelectDate={handleSelectDate}
						/>

						{selectedDate && (
							<p className="text-center">
								Día elegido: {format(selectedDate, "dd/MM/yyyy")}
							</p>
						)}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="Hora de inicio" className="text-sm">
						Hora de inicio:
					</label>
					<input
						name="startTime"
						type="time"
						value={formData.startTime}
						onChange={onChange}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="Hora de fin" className="text-sm">
						Hora de fin:
					</label>
					<input
						name="endTime"
						type="time"
						value={formData.endTime}
						onChange={onChange}
					/>
				</div>

				<ErrorMessage message={error} />

				<button
					type="button"
					onClick={onSubmit}
					className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
				>
					Crear horario personalizado
				</button>
			</div>
		</Modal>
	);
};

export default CreateCustomModal;
