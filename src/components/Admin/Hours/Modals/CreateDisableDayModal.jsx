import ErrorMessage from "@/Common/ErrorMessage";
import Modal from "@/Common/Modal";
import SimpleDatePicker from "@/Common/SimpleDayPicker";
import { format } from "date-fns";
import { X } from "lucide-react";
import React, { useState } from "react";

const CreateDisableDayModal = ({
	isOpen,
	onClose,
	onSubmit,
	disableDayData,
	onChange,
	workerName,
	error,
}) => {
	const [selectedDate, setSelectedDate] = useState(
		disableDayData.day ? new Date(disableDayData.day) : undefined,
	);
	const handleSelectDate = (date) => {
		if (!date) return;

		setSelectedDate(date);
		const formatted = format(date, "yyyy-MM-dd");

		onChange({ target: { name: "day", value: formatted } });
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose(),
				setSelectedDate()
			}}
			title={`Deshabilitar día de: ${workerName}`}
		>
			<button
				type="button"
				onClick={() => {
					onClose(),
					setSelectedDate(undefined)
				}}
				className="hover:scale-125 transition-all absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
			>
				<X />
			</button>
			<div className="space-y-4 mt-2">
				<div className="flex flex-col gap-2">
					<label htmlFor="Fecha" className="text-lg text-center">
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

				<ErrorMessage message={error} />

				<button
					type="button"
					onClick={onSubmit}
					className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
				>
					Deshabilitar día
				</button>
			</div>
		</Modal>
	);
};

export default CreateDisableDayModal;
