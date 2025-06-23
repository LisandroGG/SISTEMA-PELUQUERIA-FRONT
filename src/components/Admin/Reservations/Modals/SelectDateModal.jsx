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
				className="hover:scale-125 transition-all absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
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
				<div className="flex justify-center md:justify-end gap-2 pt-4">
					<button
						type="button"
						onClick={handleSave}
						className="hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all"
					>
						Seleccionar fecha
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default SelectDateModal;
