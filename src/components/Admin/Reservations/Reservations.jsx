import Loading from "@/Common/Loading";
import StatusSelector from "@/Common/StatusSelector";
import WorkerSelector from "@/Common/WorkerSelector";
import {
	changeReservationStatus,
	getAllReservations,
	getAllWorkers,
	getServices,
} from "@redux/actions.js";
import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import {
	BadgeCheck,
	Calendar,
	Clock,
	Eye,
	EyeOff,
	Frown,
	Funnel,
	FunnelX,
	Phone,
	SquareCheckBig,
	User,
	Users,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ChangeStatusReservationModal from "./Modals/ChangeStatusReservationsModa";
import SelectDateModal from "./Modals/SelectDateModal";

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
	const [selectedWorker, setSelectedWorker] = useState("");
	const [selectedReservationChangeStatus, setSelectedReservationChangeStatus] =
		useState("");
	const [animKey, setAnimKey] = useState(0);
	const [showFilters, setShowFilters] = useState(true);

	const now = new Date();
	const nowArg = format(now, "yyyy-MM-dd");

	const [filter, setFilter] = useState({
		date: nowArg,
	});

	// biome-ignore lint: ANIMATION
	useEffect(() => {
		setAnimKey((k) => k + 1);
	}, [reservations]);

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

	const handleChangeStatus = async () => {
		const loadingToastId = toast.loading("Guardando cambios...");

		const response = await dispatch(
			changeReservationStatus(selectedReservationChangeStatus.id),
		);
		if (response.success) {
			await dispatch(getAllReservations(filter));
			toast.dismiss(loadingToastId);
			toast.success(response.message);
			setChangeStatusModalOpen(false);
		} else {
			toast.dismiss(loadingToastId);
			toast.error(response.message);
		}
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
			<div className="flex justify-end mb-2">
				<button
					type="button"
					onClick={() => setShowFilters(!showFilters)}
					className="flex items-center justify-center hover:scale-105 px-3 py-1 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-sm font-semibold rounded-lg transition-all"
				>
					{showFilters ? (
						<EyeOff className="h-4 w-4 mr-2" />
					) : (
						<Eye className="h-4 w-4 mr-2" />
					)}
					{showFilters ? "Ocultar filtros" : "Mostrar filtros"}
				</button>
			</div>
			<p className="text-lg font-semibold mb-4">Turnos:</p>
			{showFilters && (
				<form
					onSubmit={(e) => e.preventDefault()}
					className="flex flex-col mb-4 md:grid md:grid-cols-3"
				>
					<div className="flex flex-col gap-2 md:col-span-3 md:flex-row">
						<div className="flex-1">
							<WorkerSelector
								workers={workers}
								selectedWorker={selectedWorker}
								onChange={(e) => handleFilter(e)}
							/>
						</div>
						<div className="flex-1">
							<StatusSelector
								onChange={(e) => handleFilter(e)}
								value={filter.status ?? ""}
							/>
						</div>
						<div className="flex-1 flex flex-col lg:flex-row items-center gap-2 mb-6">
							<span className="font-semibold text-shark-600">Fecha:</span>
							<button
								type="button"
								onClick={() => setSelectDateModalOpen(true)}
								className="w-full h-[39px] border border-gray-300 rounded-xl px-4 py-2 bg-white text-shark-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-shark-500 focus:border-shark-500 transition-all"
							>
								{filter.date
									? `${format(parseDateToLocal(filter.date), "dd/MM/yyyy")}`
									: "Seleccionar"}
							</button>

							<SelectDateModal
								isOpen={selectDateModalOpen}
								onClose={() => setSelectDateModalOpen(false)}
								filter={filter}
								handleFilter={handleFilter}
								parseDateToLocal={parseDateToLocal}
							/>
						</div>
					</div>

					<div className="flex flex-col gap-2 md:col-span-3 md:flex-row md:justify-end">
						<button
							type="button"
							onClick={() => {
								setFilter({ date: nowArg });
								setSelectedWorker("");
								dispatch(getAllReservations({ date: nowArg }));
							}}
							className="flex items-center justify-center hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all"
						>
							<FunnelX className="h-5 w-5 shrink-0 mr-2" />
							<span>Restablecer filtros</span>
						</button>

						<button
							type="button"
							onClick={() => dispatch(getAllReservations(filter))}
							className="flex items-center justify-center hover:scale-105 px-4 py-2 cursor-pointer font-chivo text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all"
						>
							<Funnel className="h-5 w-5 shrink-0 mr-2" />
							<span>Filtrar</span>
						</button>
					</div>
				</form>
			)}

			{reservations?.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-80 text-gray-500 gap-2">
					<Frown className="w-10 h-10" />
					<p className="text-lg font-medium text-center">
						No hay turnos con esos filtros
					</p>
				</div>
			) : (
				<section
					key={animKey}
					className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
				>
					{reservations?.map((res, index) => {
						const fechaValida = res?.date && isValid(parseISO(res.date));
						return (
							<article
								key={res?.id ?? `reservation-${index}`}
								className="p-4 border border-t-4 border-shark-500 rounded shadow bg-white animate-fadeInToRight"
							>
								<p className="flex items-start gap-2 break-all w-full">
									<Users className="h-5 w-5 shrink-0" />
									<span className="break-words w-full font-semibold">
										{res.worker?.name}
									</span>
								</p>
								<p className="flex items-start gap-2 break-all w-full">
									<Calendar className="h-5 w-5 shrink-0" />
									<span className="break-words w-full tracking-wider font-semibold">
										{fechaValida
											? format(parseISO(res.date), "dd/MM/yyyy", {
													locale: es,
												}).replace(/^./, (str) => str.toUpperCase())
											: (res?.date ?? "Fecha no disponible")}
									</span>
								</p>
								<p className="flex items-start gap-2 break-all w-full">
									<BadgeCheck className="h-5 w-5 shrink-0" />
									<span className="break-words w-full font-semibold">
										{res.service?.name}({res.service?.duration} m)
									</span>
								</p>
								<p className="flex items-start gap-2 break-all w-full">
									<Clock className="h-5 w-5 shrink-0" />
									<span className="break-words w-full font-semibold">
										{res.startTime?.slice(0, 5)} - {res.endTime?.slice(0, 5)}
									</span>
								</p>
								<p className="flex items-start gap-2 break-all w-full">
									<User className="h-5 w-5 shrink-0" />
									<span className="break-words w-full font-semibold">
										{res.clientName}
									</span>
								</p>
								<p className="flex items-start gap-2 break-all w-full">
									<Phone className="h-5 w-5 shrink-0" />
									<span className="break-words w-full font-semibold tracking-wider">
										{res.clientPhoneNumber}
									</span>
								</p>
								{res.status === "confirm" ? (
									<div className="flex gap-2 justify-center md:justify-end mt-2 md:mt-auto">
										<button
											type="button"
											onClick={() => {
												setSelectedReservationChangeStatus(res);
												setChangeStatusModalOpen(true);
											}}
											className="hover:scale-105 flex px-2 items-center gap-1 font-chivo cursor-pointer text-white bg-shark-500 text-md font-semibold p-1 rounded-lg hover:bg-shark-600 transition-all"
										>
											<SquareCheckBig className="w-5 h-5" />
											<span>Terminado</span>
										</button>
									</div>
								) : (
									""
								)}
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
