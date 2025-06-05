import { Pencil, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
	createWorkingHour,
	deleteCustomWorkingHour,
	editCustomWorkingHour,
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
	const [error, setError] = useState("");
	const [selectedWorker, setSelectedWorker] = useState("");

	const handleSelectChange = (e) => {
		const selectedName = e.target.value;
		setSelectedWorker(selectedName);

		dispatch(getWorkingHours(selectedName));
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
				<p>No hay horarios cargados para este trabajador.</p>
			) : (
				<div className="mt-4">
					<p className="font-semibold mb-2">Horarios de trabajo:</p>
					<ul className="list-disc list-inside">
						{workingHours?.map((hour) => (
							<li key={hour.id}>
								{hour.dayOfWeek}: {hour.startTime} - {hour.endTime}
							</li>
						))}
					</ul>
				</div>
			)}
		</section>
	);
};

export default Hours;
