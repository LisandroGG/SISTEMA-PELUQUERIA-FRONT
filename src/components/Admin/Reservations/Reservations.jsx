import Loading from "@/Common/Loading";
import StatusSelector from "@/Common/StatusSelector";
import WorkerSelector from "@/Common/WorkerSelector";
import SelectDateModal from "./Modals/SelectDateModal";
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
import { SquareCheckBig } from "lucide-react";
import ChangeStatusReservationModal from "./Modals/ChangeStatusReservationsModa";

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
	const [selectDateModalOpen, setSelectDateModalOpen] = useState(false);
	const [filter, setFilter] = useState({});
	const [selectedWorker, setSelectedWorker] = useState("");
	const [selectedReservationChangeStatus, setSelectedReservationChangeStatus] = useState("");

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
		if (name === "serviceId") {
			setSelectedService(value);
		}
		setFilter((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const parseDateToLocal = (dateString) => {
		if (!dateString) return undefined;
		const [year, month, day] = dateString.split("-").map(Number);
		return new Date(year, month - 1, day);
	};

	const handleChangeStatus = async() => {

		const loadingToastId = toast.loading("Guardando cambios...");

		const response = await dispatch(changeReservationStatus(selectedReservationChangeStatus.id));
				if (response.success) {
					await dispatch(getAllReservations());
					toast.dismiss(loadingToastId);
					toast.success(response.message);
					setChangeStatusModalOpen(false);
				} else {
					toast.dismiss(loadingToastId);
					toast.error(response.message);
				}
	}

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
				<div>
					<button
						type="button"
						onClick={() => setSelectDateModalOpen(true)}
						className="px-4 py-2 bg-blue-500 text-gray-50 rounded hover:bg-blue-600"
					>
						{filter.date
							? `Fecha seleccionada: ${format(parseDateToLocal(filter.date), "dd/MM/yyyy")}`
							: "Seleccionar fecha"}
					</button>

					<SelectDateModal
						isOpen={selectDateModalOpen}
						onClose={() => setSelectDateModalOpen(false)}
						filter={filter}
						handleFilter={handleFilter}
						parseDateToLocal={parseDateToLocal}
					/>
				</div>
				<StatusSelector
					onChange={(e) => handleFilter(e)}
					value={filter.status ?? ""}
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
								<button
								type="button"
								onClick={() => {
									setSelectedReservationChangeStatus(res);
									setChangeStatusModalOpen(true);
								}}
							>
								<SquareCheckBig className="w-5 h-5" />
							</button>
							</article>
						);
					})}
				</section>
			)}
			<ChangeStatusReservationModal
				isOpen={changeStatusModalOpen}
				onClose={() => setChangeStatusModalOpen(false)}
				onSubmit={handleChangeStatus}
				selectedReservationChangeStatus={selectedReservationChangeStatus}
			/>
		</section>
	);
};

export default Reservations;
