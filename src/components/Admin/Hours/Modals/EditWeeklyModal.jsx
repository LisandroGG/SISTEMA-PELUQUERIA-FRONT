import InputTime from "@/Common/InputTime";
import Modal from "@/Common/Modal";
import React from "react";

const EditWeeklyModal = ({
	isOpen,
	onClose,
	hour,
	startTime,
	endTime,
	setStartTime,
	setEndTime,
	onSubmit,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={`Editar horario de ${hour?.dayOfWeek || ""}`}
		>
			<div className="space-y-4">
				<div className="flex items-center gap-4 justify-center">
					<p className="capitalize">{hour?.dayOfWeek}:</p>
					<InputTime
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						className=""
					/>
					<span>-</span>
					<InputTime
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
						className=""
					/>
				</div>
				<div className="flex justify-center md:justify-end gap-2 pt-2">
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
			</div>
		</Modal>
	);
};

export default EditWeeklyModal;
