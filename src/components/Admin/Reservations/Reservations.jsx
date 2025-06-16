import Loading from "@/Common/Loading";
import WorkerSelector from "@/Common/WorkerSelector";
import {
	changeReservationStatus,
	getAllReservations,
	getAllWorkers,
	getServices,
} from "@redux/actions.js";
import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Reservations = () => {
	const dispatch = useDispatch();
	const executed = useRef(false);
	const reservations = useSelector((state) => state.reservations);
	const workers = useSelector((state) => state.workers);
	const isLoadingReservations = useSelector(
		(state) => state.isLoadingReservations,
	);
	const isLoadingWorkers = useSelector((state) => state.isLoadingWorkers);
	const isLoadingServices = useSelector((state) => state.isLoadingServices);
	const [changeStatusModalOpen, setChangeStatusModalOpen] = useState(false);
	const [filter, setFilter] = useState({});
	const [selectedWorker, setSelectedWorker] = useState("");

	useEffect(() => {
		if (executed.current) return;
		executed.current = true;

		dispatch(getAllReservations(filter));
		dispatch(getAllWorkers());
		dispatch(getServices());
	}, [filter, dispatch]);

	const handleFilter = (e) => {
		const { name, value } = e.target;
		if (name === "workerId") {
			setSelectedWorker(value);
		}
		setFilter((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	if (isLoadingReservations && isLoadingServices && isLoadingWorkers) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando Turnos..."} />
			</div>
		);
	}

	return (
		<section className="max-w-7xl mx-auto p-4 md:px-8 lg:px-4 px-5">
			<p>Turnos:</p>
			<form onSubmit={(e) => e.preventDefault()} className="flex gap-4 mb-4">
				<select
					name="status"
					onChange={(e) => handleFilter(e)}
					value={filter.status ?? ""}
				>
					<option value="">Todos</option>
					<option value="confirm">Confirmados</option>
					<option value="finish">Terminados</option>
					<option value="cancel">Cancelados</option>
				</select>

				<input
					type="date"
					name="date"
					value={filter.date ?? ""}
					onChange={(e) => handleFilter(e)}
				/>

				<WorkerSelector
					workers={workers}
					selectedWorker={selectedWorker}
					onChange={(e) => handleFilter(e)}
				/>

				<button
					type="button"
					onClick={() => dispatch(getAllReservations(filter))}
				>
					Filtrar
				</button>
				<button
					type="button"
					onClick={() => {
						setFilter({});
						setSelectedWorker("");
						dispatch(getAllReservations({}));
					}}
					className=""
				>
					Restablecer filtros
				</button>
			</form>
			{reservations?.length === 0 ? (
				<p>No hay turnos disponibles</p>
			) : (
				<section className="flex gap-4">
					{reservations?.map((res, index) => {
						const fechaValida = res?.date && isValid(parseISO(res.date));
						return (
							<article key={res?.id ?? `reservation-${index}`}>
								<p>
									{fechaValida
										? format(parseISO(res.date), "dd/MM/yyyy", {
												locale: es,
											}).replace(/^./, (str) => str.toUpperCase())
										: (res?.date ?? "Fecha no disponible")}
								</p>
								<p>
									{res.startTime?.slice(0, 5)} - {res.endTime?.slice(0, 5)}
								</p>
								<p>{res.worker.name}</p>
								<p>
									{res.service.name}({res.service.duration} m)
								</p>
								<p>{res.clientName}</p>
								<p>{res.clientPhoneNumber}</p>
								<p>{res.status}</p>
							</article>
						);
					})}
				</section>
			)}
		</section>
	);
};

export default Reservations;
