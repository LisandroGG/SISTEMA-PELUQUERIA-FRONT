import {
	createCustomWorkingHour,
	createDisableDay,
	createWorkingHour,
	deleteCustomWorkingHour,
	deleteDisableDay,
	deleteWorkingHour,
	editCustomWorkingHour,
	editWorkingHours,
	getAllWorkers,
	getCustomWorkingHours,
	getDisableDays,
	getWorkingHours,
} from "@redux/actions.js";
import { Users } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Loading from "@/Common/Loading.jsx";
import WorkerSelector from "@/Common/WorkerSelector.jsx";
import CustomHoursList from "./CustomHoursList.jsx";
import DisableDaysList from "./DisableDaysList.jsx";
import CreateCustomModal from "./Modals/CreateCustomModal.jsx";
import CreateDisableDayModal from "./Modals/CreateDisableDayModal.jsx";
import CreateWeeklyModal from "./Modals/CreateWeeklyModal.jsx";
import DeleteCustomModal from "./Modals/DeleteCustomModal.jsx";
import DeleteDisableDayModal from "./Modals/DeleteDisableDayModal.jsx";
import DeleteWeeklyModal from "./Modals/DeleteWeeklyModal.jsx";
import EditCustomModal from "./Modals/EditCustomModal.jsx";
import EditWeeklyModal from "./Modals/EditWeeklyModal.jsx";
import WeeklyHoursList from "./WeeklyHoursList.jsx";

const Hours = () => {
	const dispatch = useDispatch();
	const executed = useRef(false);

	const workers = useSelector((state) => state.workers);
	const workingHours = useSelector((state) => state.workingHours);
	const customWorkingHours = useSelector((state) => state.customWorkingHours);
	const disableDays = useSelector((state) => state.disableDays);
	const isLoadingWorkers = useSelector((state) => state.isLoadingWorkers);
	const isLoadingWorkingHours = useSelector(
		(state) => state.isLoadingWorkingHours,
	);
	const isLoadingCustomWorkingHours = useSelector(
		(state) => state.isLoadingCustomWorkingHours,
	);
	const isLoadingDisableDays = useSelector(
		(state) => state.isLoadingDisableDays,
	);

	const [selectedWorker, setSelectedWorker] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [customModalOpen, setCustomModalOpen] = useState(false);
	const [deleteCustomModalOpen, setDeleteCustomModalOpen] = useState(false);
	const [editCustomModalOpen, setEditCustomModalOpen] = useState(false);
	const [disableDayModalOpen, setDisableDayModalOpen] = useState(false);
	const [deleteDisableDayModalOpen, setDeleteDisableDayModalOpen] =
		useState(false);

	const [hourToDelete, setHourToDelete] = useState(null);
	const [hourToEdit, setHourToEdit] = useState(null);
	const [customHourToDelete, setCustomHourToDelete] = useState(null);
	const [customHourToEdit, setCustomHourToEdit] = useState(null);
	const [disableDayToDelete, setDisableDayToDelete] = useState(null);

	const [editStart, setEditStart] = useState("");
	const [editEnd, setEditEnd] = useState("");
	const [editCustomStart, setEditCustomStart] = useState("");
	const [editCustomEnd, setEditCustomEnd] = useState("");

	const [error, setError] = useState("");
	const [newBlocks, setNewBlocks] = useState([{ day: "", start: "", end: "" }]);
	const [formData, setFormData] = useState({
		workerId: "",
		dayOfWeek: "",
		startTime: "",
		endTime: "",
	});

	const [disableDayData, setDisableDayData] = useState({
		workerId: "",
		day: "",
	});

	useEffect(() => {
		if (executed.current) return;
		executed.current = true;
		dispatch(getAllWorkers());
	}, [dispatch]);

	const handleSelectChange = (e) => {
		const id = e.target.value;
		setSelectedWorker(id);
		dispatch(getWorkingHours(id));
		dispatch(getCustomWorkingHours(id));
		dispatch(getDisableDays(id));
	};

	const handleAddBlock = () =>
		setNewBlocks([...newBlocks, { day: "", start: "", end: "" }]);
	const handleRemoveBlock = (index) =>
		setNewBlocks(newBlocks.filter((_, i) => i !== index));
	const handleChangeBlock = (index, field, value) => {
		const updated = [...newBlocks];
		updated[index][field] = value;
		setNewBlocks(updated);
	};

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleDayChange = (e) =>
		setDisableDayData({ ...disableDayData, [e.target.name]: e.target.value });

	const handleSubmit = async () => {
		const valid = newBlocks.filter(
			(b) => b.day && b.start && b.end && b.start < b.end,
		);
		if (!valid.length)
			return setError("Debes completar al menos un bloque válido.");
		const payload = valid.map((b) => ({
			workerId: Number(selectedWorker),
			dayOfWeek: b.day,
			startTime: b.start,
			endTime: b.end,
		}));
		const response = await dispatch(createWorkingHour(payload));
		if (response.success) {
			toast.success(response.message);
			dispatch(getWorkingHours(selectedWorker));
			handleCloseWeeklyModal();
		} else {
			toast.error(response.message);
		}
	};

	const handleCreateCustomHour = async () => {
		if (
			!formData.dayOfWeek ||
			!formData.startTime ||
			!formData.endTime ||
			formData.endTime <= formData.startTime
		) {
			return setError("Completá todos los campos con horas válidas.");
		}
		const response = await dispatch(
			createCustomWorkingHour({
				...formData,
				workerId: Number(selectedWorker),
			}),
		);
		if (response.success) {
			toast.success(response.message);
			handleCloseCustomModal();
			dispatch(getCustomWorkingHours(selectedWorker));
		} else {
			toast.error(response.message);
		}
	};

	const handleEditSubmit = async () => {
		if (!editStart || !editEnd || editStart >= editEnd)
			return toast.error("Horas inválidas");
		const response = await dispatch(
			editWorkingHours(
				{ startTime: editStart, endTime: editEnd },
				hourToEdit.id,
			),
		);
		if (response.success) {
			toast.success(response.message);
			setEditModalOpen(false);
			dispatch(getWorkingHours(selectedWorker));
		} else {
			toast.error(response.message);
		}
	};

	const handleCustomEditSubmit = async () => {
		if (!editCustomStart || !editCustomEnd || editCustomStart >= editCustomEnd)
			return toast.error("Horas inválidas");
		const response = await dispatch(
			editCustomWorkingHour(
				{ startTime: editCustomStart, endTime: editCustomEnd },
				customHourToEdit.id,
			),
		);
		if (response.success) {
			toast.success(response.message);
			setEditCustomModalOpen(false);
			dispatch(getCustomWorkingHours(selectedWorker));
		} else {
			toast.error(response.message);
		}
	};

	const handleDisableDaySubmit = async () => {
		if (!disableDayData.day) {
			return setError("Selecciona el día a deshabilitar");
		}
		const response = await dispatch(
			createDisableDay({ ...disableDayData, workerId: Number(selectedWorker) }),
		);
		if (response.success) {
			toast.success(response.message);
			handleCloseDisableDayModal();
			dispatch(getDisableDays(selectedWorker));
		} else {
			toast.error(response.message);
		}
	};

	const handleDeleteHour = async (id) => {
		const response = await dispatch(deleteWorkingHour(id));
		if (response.success) {
			toast.success(response.message);
			setDeleteModalOpen(false);
			dispatch(getWorkingHours(selectedWorker));
		} else {
			toast.error(response.message);
		}
	};

	const handleDeleteCustomHour = async (id) => {
		const response = await dispatch(deleteCustomWorkingHour(id));
		if (response.success) {
			toast.success(response.message);
			setDeleteCustomModalOpen(false);
			dispatch(getCustomWorkingHours(selectedWorker));
		} else {
			toast.error(response.message);
		}
	};

	const handleDeleteDisableDay = async (id) => {
		const response = await dispatch(deleteDisableDay(id));
		if (response.success) {
			toast.success(response.message);
			setDeleteDisableDayModalOpen(false);
			dispatch(getDisableDays(selectedWorker));
		} else {
			toast.error(response.message);
		}
	};

	const handleCloseCustomModal = () => {
		setFormData({
			workerId: "",
			dayOfWeek: "",
			startTime: "",
			endTime: "",
		});
		setError("");
		setCustomModalOpen(false);
	};

	const handleCloseWeeklyModal = () => {
		setNewBlocks([{ day: "", start: "", end: "" }]);
		setError("");
		setModalOpen(false);
	};

	if (isLoadingWorkers) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando trabajadores..."} />
			</div>
		);
	}

	return (
		<section className="max-w-7xl mx-auto p-4">
			<p className="font-semibold mb-2">Horarios de trabajo:</p>

			{workers.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-80 text-gray-500 gap-2">
					<Users className="w-10 h-10" />
					<p className="text-lg font-medium text-center">
						No hay trabajadores registrados
					</p>
				</div>
			) : (
				<div className="md:max-w-80">
					<WorkerSelector
						workers={workers}
						selectedWorker={selectedWorker}
						onChange={handleSelectChange}
					/>
				</div>
			)}

			{selectedWorker &&
				!isLoadingWorkingHours &&
				!isLoadingCustomWorkingHours &&
				!isLoadingDisableDays && (
					<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeInToRight">
						<div className="p-4 border border-t-4 border-shark-500 rounded shadow bg-white h-[500px] flex flex-col">
							<div className="flex-[1] flex items-center justify-center">
								<p className="font-semibold text-center text-lg">Semanales:</p>
							</div>
							<div className="flex-[8] overflow-y-auto px-2 flex flex-col">
								<WeeklyHoursList
									workingHours={workingHours}
									onEdit={(hour) => {
										setHourToEdit(hour);
										setEditStart(hour.startTime.slice(0, 5));
										setEditEnd(hour.endTime.slice(0, 5));
										setEditModalOpen(true);
									}}
									onDelete={(hour) => {
										setHourToDelete(hour);
										setDeleteModalOpen(true);
									}}
								/>
							</div>
							<div className="flex-[1] flex items-center justify-center">
								<button
									type="button"
									onClick={() => setModalOpen(true)}
									className="hover:scale-105 flex px-2 items-center gap-1 font-chivo cursor-pointer text-white bg-shark-500 text-md font-semibold p-1 rounded-lg hover:bg-shark-600 transition-all"
								>
									Crear horarios semanales
								</button>
							</div>
						</div>

						<div className="p-4 border border-t-4 border-shark-500 rounded shadow bg-white h-[500px] flex flex-col">
							<div className="flex-[1] flex items-center justify-center">
								<p className="font-semibold mb-2 text-center text-lg">
									Personalizados:
								</p>
							</div>
							<div className="flex-[8] overflow-y-auto px-2 flex flex-col">
								<CustomHoursList
									customHours={customWorkingHours}
									onEdit={(hour) => {
										setCustomHourToEdit(hour);
										setEditCustomStart(hour.startTime.slice(0, 5));
										setEditCustomEnd(hour.endTime.slice(0, 5));
										setEditCustomModalOpen(true);
									}}
									onDelete={(hour) => {
										setCustomHourToDelete(hour);
										setDeleteCustomModalOpen(true);
									}}
								/>
							</div>
							<div className="flex-[1] flex items-center justify-center">
								<button
									type="button"
									onClick={() => setCustomModalOpen(true)}
									className="hover:scale-105 flex px-2 items-center gap-1 font-chivo cursor-pointer text-white bg-shark-500 text-md font-semibold p-1 rounded-lg hover:bg-shark-600 transition-all"
								>
									Crear horario personalizado
								</button>
							</div>
						</div>

						<div className="p-4 border border-t-4 border-shark-500 rounded shadow bg-white h-[500px] flex flex-col">
							<div className="flex-[1] flex items-center justify-center">
								<p className="font-semibold mb-2 text-center text-lg">
									Dias deshabilitados:
								</p>
							</div>
							<div className="flex-[8] overflow-y-auto px-2 flex flex-col">
								<DisableDaysList
									disableDays={disableDays}
									onDelete={(day) => {
										setDisableDayToDelete(day);
										setDeleteDisableDayModalOpen(true);
									}}
								/>
							</div>
							<div className="flex-[1] flex items-center justify-center">
								<button
									type="button"
									onClick={() => setDisableDayModalOpen(true)}
									className="hover:scale-105 flex px-2 items-center gap-1 font-chivo cursor-pointer text-white bg-shark-500 text-md font-semibold p-1 rounded-lg hover:bg-shark-600 transition-all"
								>
									Crear horario personalizado
								</button>
							</div>
						</div>
					</section>
				)}

			<CreateWeeklyModal
				isOpen={modalOpen}
				onClose={handleCloseWeeklyModal}
				workerName={
					workers.find((w) => w.id === Number(selectedWorker))?.name || ""
				}
				blocks={newBlocks}
				onAddBlock={handleAddBlock}
				onRemoveBlock={handleRemoveBlock}
				onChangeBlock={handleChangeBlock}
				onSubmit={handleSubmit}
				error={error}
			/>

			<CreateCustomModal
				isOpen={customModalOpen}
				onClose={handleCloseCustomModal}
				workerName={
					workers.find((w) => w.id === Number(selectedWorker))?.name || ""
				}
				formData={formData}
				onChange={handleChange}
				onSubmit={handleCreateCustomHour}
				error={error}
			/>

			<CreateDisableDayModal
				isOpen={disableDayModalOpen}
				onClose={() => setDisableDayModalOpen(false)}
				workerName={
					workers.find((w) => w.id === Number(selectedWorker))?.name || ""
				}
				disableDayData={disableDayData}
				onChange={handleDayChange}
				onSubmit={handleDisableDaySubmit}
				error={error}
			/>

			<EditWeeklyModal
				isOpen={editModalOpen}
				onClose={() => setEditModalOpen(false)}
				hour={hourToEdit}
				startTime={editStart}
				endTime={editEnd}
				setStartTime={setEditStart}
				setEndTime={setEditEnd}
				onSubmit={handleEditSubmit}
			/>

			<EditCustomModal
				isOpen={editCustomModalOpen}
				onClose={() => setEditCustomModalOpen(false)}
				hour={customHourToEdit}
				startTime={editCustomStart}
				endTime={editCustomEnd}
				setStartTime={setEditCustomStart}
				setEndTime={setEditCustomEnd}
				onSubmit={handleCustomEditSubmit}
			/>

			<DeleteWeeklyModal
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				hour={hourToDelete}
				onDelete={handleDeleteHour}
			/>

			<DeleteCustomModal
				isOpen={deleteCustomModalOpen}
				onClose={() => setDeleteCustomModalOpen(false)}
				hour={customHourToDelete}
				onDelete={handleDeleteCustomHour}
			/>

			<DeleteDisableDayModal
				isOpen={deleteDisableDayModalOpen}
				onClose={() => setDeleteDisableDayModalOpen(false)}
				day={disableDayToDelete}
				onDelete={handleDeleteDisableDay}
			/>
		</section>
	);
};

export default Hours;
