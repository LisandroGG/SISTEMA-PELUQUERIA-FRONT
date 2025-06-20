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
			onClose={() => {
				onClose();
				setSelectedDate(undefined)
			}}
			title={`Crear horario personalizado de: ${workerName}`}
		>
			<button
				type="button"
				onClick={() => {
				onClose();
				setSelectedDate(undefined)
			}}
				className="hover:scale-125 transition-all absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
			>
				<X />
			</button>

			<div className="space-y-4">
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
				<div className="flex flex-col items-center text-md">
					<label htmlFor="Hora de inicio" className="font-semibold">
						Hora de inicio:
					</label>
					<input
						name="startTime"
						type="time"
						value={formData.startTime}
						onChange={onChange}
					/>

					<label htmlFor="Hora de fin" className="font-semibold">
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
				<div className="flex justify-center md:justify-end pt-4">
				<button
					type="button"
					onClick={() => {
						onSubmit()
					setSelectedDate(undefined)}}
					className="hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all"
				>
					Crear horario personalizado
				</button>
				</div>
			</div>
		</Modal>
	);
};

export default CreateCustomModal;
