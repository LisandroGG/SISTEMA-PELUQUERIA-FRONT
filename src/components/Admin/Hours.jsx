import { Pencil, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
	createWorkingHour,
	deleteWorkingHour,
	editWorkingHours,
	getAllWorkers,
	getWorkingHours,
} from "../../redux/actions";
import ErrorMessage from "../Common/ErrorMessage";
import Loading from "../Common/Loading";
import Modal from "../Common/Modal";

const Hours = () => {
	const dispatch = useDispatch();
	const executed = useRef(false);
	const workers = useSelector((state) => state.workers);
	const isLoadingWorkers = useSelector((state) => state.isLoadingWorkers);
	const workingHours = useSelector((state) => state.workingHours);
	const isLoadingWorkingHours = useSelector(
		(state) => state.isLoadingWorkingHours,
	);
	const [modalOpen, setModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [error, setError] = useState("");
	const [selectedWorker, setSelectedWorker] = useState("");
	const [hourToDelete, setHourToDelete] = useState(null);

	const daysOfWeek = [
		"lunes",
		"martes",
		"miércoles",
		"jueves",
		"viernes",
		"sábado",
	];
	const [newBlocks, setNewBlocks] = useState([]);

	const handleAddBlock = () => {
		setNewBlocks((prev) => [...prev, { day: "", start: "", end: "" }]);
	};

	const handleChangeBlock = (index, field, value) => {
		const updatedBlocks = [...newBlocks];
		updatedBlocks[index][field] = value;
		setNewBlocks(updatedBlocks);
	};

	const toggleModal = () => {
		setModalOpen(!modalOpen);
		setError("");
		setNewBlocks([]);
	};

	const handleSelectChange = (e) => {
		const selectedName = e.target.value;
		setSelectedWorker(selectedName);

		dispatch(getWorkingHours(selectedName));
	};

	const handleSubmit = async () => {
		const filtered = newBlocks.filter(
			(block) =>
				block.day && block.start && block.end && block.start < block.end,
		);

		if (filtered.length === 0) {
			setError("Debes completar al menos un bloque válido.");
			return;
		}

		const payload = filtered.map((block) => ({
			workerId: Number(selectedWorker),
			dayOfWeek: block.day,
			startTime: block.start,
			endTime: block.end,
		}));

		const result = await dispatch(createWorkingHour(payload));

		if (result.success) {
			toast.success(result.message || "Horarios guardados correctamente.");
			toggleModal();
			setNewBlocks([]);
			dispatch(getWorkingHours(selectedWorker));
		} else {
			toast.error(result.message || "Error al guardar horarios.");
		}
	};
	const handleDeleteHour = async (id) => {
		const result = await dispatch(deleteWorkingHour(id));
		if (result.success) {
			toast.success(result.message || "Horario eliminado correctamente.");
			setDeleteModalOpen(false);
			setHourToDelete(null);
			dispatch(getWorkingHours(selectedWorker));
		} else {
			toast.error(result.message || "Error al eliminar horario.");
		}
	};

	useEffect(() => {
		if (executed.current) return;
		executed.current = true;

		dispatch(getAllWorkers());
	}, [dispatch]);

	if (isLoadingWorkers) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando trabajadores..."} />
			</div>
		);
	}

	return (
		<section className="max-w-7xl mx-auto p-4 md:px-8 lg:px-4 px-5">
			<p>Horarios: </p>
			{workers?.length === 0 ? (
				<p>No hay trabajadores disponibles</p>
			) : (
				<div className="flex">
					<p>Seleccione trabajador: </p>
					<select value={selectedWorker} onChange={handleSelectChange}>
						<option value="">-- Seleccionar --</option>
						{workers?.map((worker, index) => (
							<option key={worker.id || index} value={worker.id}>
								{worker.name}
							</option>
						))}
					</select>
				</div>
			)}
			{selectedWorker === "" ? (
				<p className="text-gray-600">
					Seleccioná un trabajador para ver los horarios
				</p>
			) : isLoadingWorkingHours ? (
				<div className="min-h-screen grid place-content-center">
					<Loading loadingText="Cargando horarios..." />
				</div>
			) : workingHours.length === 0 ? (
				<div>
					<p>No hay horarios cargados para este trabajador.</p>
				</div>
			) : (
				<div className="mt-4">
					<p className="font-semibold mb-2">Horarios de trabajo:</p>
					<ul className="list-disc list-inside">
						{workingHours?.map((hour) => (
							<li key={hour.id}>
								<span>
									{hour.dayOfWeek}: {hour.startTime?.slice(0, 5)} -{" "}
									{hour.endTime?.slice(0, 5)}
								</span>
								<div className="flex gap-2">
									<button
										type="button"
										className="text-red-600 hover:underline"
										onClick={() => {
											setHourToDelete(hour);
											setDeleteModalOpen(true);
										}}
									>
										<X className="w-4 h-4" />
									</button>
								</div>
							</li>
						))}
					</ul>
					<button type="button" onClick={toggleModal}>
						Crear horarios
					</button>
				</div>
			)}
			<Modal
				isOpen={modalOpen}
				onClose={toggleModal}
				title={`Crear horarios de: ${workers.find((w) => w.id === Number(selectedWorker))?.name || ""}`}
			>
				<button
					type="button"
					onClick={toggleModal}
					className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
				>
					<X />
				</button>
				<div className="space-y-4">
					{newBlocks.map((block, index) => (
						<div key={block.id} className="flex items-center gap-4">
							<select
								value={block.day}
								onChange={(e) =>
									handleChangeBlock(index, "day", e.target.value)
								}
								className="border p-1 rounded"
							>
								<option value="">Día</option>
								{daysOfWeek.map((day) => (
									<option key={day} value={day}>
										{day}
									</option>
								))}
							</select>
							<input
								type="time"
								value={block.start}
								onChange={(e) =>
									handleChangeBlock(index, "start", e.target.value)
								}
								className="border p-1 rounded"
							/>
							<span>-</span>
							<input
								type="time"
								value={block.end}
								onChange={(e) =>
									handleChangeBlock(index, "end", e.target.value)
								}
								className="border p-1 rounded"
							/>
						</div>
					))}

					<button
						type="button"
						onClick={handleAddBlock}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Agregar bloque
					</button>
				</div>
				<ErrorMessage message={error} />
				<div>
					<button type="submit" onClick={handleSubmit}>
						Crear horarios
					</button>
				</div>
			</Modal>
			<Modal
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				title="Eliminar horario"
			>
				<p className="text-gray-700">
					¿Estás seguro de que querés eliminar el horario de{" "}
					<strong>{hourToDelete?.dayOfWeek}</strong> desde{" "}
					<strong>{hourToDelete?.startTime.slice(0, 5)}</strong> hasta{" "}
					<strong>{hourToDelete?.endTime.slice(0, 5)}</strong>?
				</p>

				<div className="mt-6 flex justify-end gap-4">
					<button
						type="button"
						onClick={() => setDeleteModalOpen(false)}
						className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
					>
						Cancelar
					</button>
					<button
						type="button"
						onClick={() => handleDeleteHour(hourToDelete.id)}
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
					>
						Eliminar
					</button>
				</div>
			</Modal>
		</section>
	);
};

export default Hours;
