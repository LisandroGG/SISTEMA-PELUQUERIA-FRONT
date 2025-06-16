import Modal from "@/Common/Modal";
import SimpleDatePicker from "@/Common/SimpleDayPicker";
import { format } from "date-fns";
import { X } from "lucide-react";
import React, { useState } from "react";

const SelectDateModal = ({
	isOpen,
	onClose,
	filter,
	handleFilter,
	parseDateToLocal,
}) => {
	const [selectedDate, setSelectedDate] = useState(
		filter.date ? parseDateToLocal(filter.date) : new Date(),
	);

	const handleSelectDate = (date) => {
		if (!date) return;

		setSelectedDate(date);
	};

	const handleSave = () => {
		if (selectedDate) {
			handleFilter({
				target: { name: "date", value: format(selectedDate, "yyyy-MM-dd") },
			});
			onClose();
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Modificar fecha">
			<button
				type="button"
				onClick={onClose}
				className="absolute top-2 right-2 text-gray-600 hover:text-black"
			>
				<X />
			</button>

			<div className="space-y-4 mt-2">
				<div className="flex flex-col gap-2">
					<label htmlFor="Fecha" className="text-lg text-center">
						Seleccione un nuevo día:
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

				<button
					type="button"
					onClick={handleSave}
					className="px-4 py-2 bg-green-600 text-gray-50 rounded hover:bg-green-700"
				>
					Aplicar fecha
				</button>
			</div>
		</Modal>
	);
};

export default SelectDateModal;
