import Loading from "@/Common/Loading";
import {
	validateGmail,
	validateName,
	validatePhone,
} from "@/Utils/Validations";
import {
	createWorker,
	deleteWorker,
	editWorker,
	getAllWorkers,
} from "@redux/actions.js";
import { Mail, Pencil, Phone, User, Users, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CreateWorkerModal from "./Modals/CreateWorkerModal";
import DeleteWorkerModal from "./Modals/DeleteWorkerModal";
import EditWorkerModal from "./Modals/EditWorkerModal";

const Workers = () => {
	const dispatch = useDispatch();
	const executed = useRef(false);
	const workers = useSelector((state) => state.workers);
	const isLoadingWorkers = useSelector((state) => state.isLoadingWorkers);
	const [modalOpen, setModalOpen] = useState(false);
	const [error, setError] = useState("");
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [workerToDelete, setWorkerToDelete] = useState(null);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [workerToEdit, setWorkerToEdit] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		gmail: "",
		phoneNumber: "",
	});

	const toggleModal = () => {
		setModalOpen(!modalOpen);
		cleanData();
		setError("");
	};

	const toggleEditModal = () => {
		setEditModalOpen(!editModalOpen);
		setWorkerToEdit(null);
		setError("");
	};

	const cleanData = () =>
		setFormData({
			name: "",
			gmail: "",
			phoneNumber: "",
		});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCreateWorker = async (e) => {
		e.preventDefault();

		if (!formData.name || !formData.gmail) {
			return setError("Complete los campos");
		}

		const nameError = validateName(formData.name);
		if (nameError) return setError(nameError);

		const gmailError = validateGmail(formData.gmail);
		if (gmailError) return setError(gmailError);

		const phoneError = validatePhone(formData.phoneNumber);
		if (phoneError) return setError(phoneError);

		const loadingToastId = toast.loading("Creando trabajador...");

		const response = await dispatch(createWorker(formData));
		if (response.success) {
			await dispatch(getAllWorkers());
			toast.dismiss(loadingToastId);
			toast.success(response.message);
			toggleModal();
		} else {
			toast.dismiss(loadingToastId);
			setError(response.message);
		}
	};

	const handleEditWorker = async (e) => {
		e.preventDefault();

		if (!formData.gmail || !formData.phoneNumber) {
			return setError("Complete los campos");
		}

		const gmailError = validateGmail(formData.gmail);
		if (gmailError) return setError(gmailError);

		const phoneError = validatePhone(formData.phoneNumber);
		if (phoneError) return setError(phoneError);

		if (!workerToEdit) {
			return setError("No se seleccionó ningún trabajador para editar");
		}

		const loadingToastId = toast.loading("Guardando cambios...");

		const response = await dispatch(editWorker(formData, workerToEdit.id));
		if (response.success) {
			await dispatch(getAllWorkers());
			toast.dismiss(loadingToastId);
			toast.success(response.message);
			toggleEditModal();
		} else {
			toast.dismiss(loadingToastId);
			setError(response.message);
		}
	};

	const handleDeleteWorker = async () => {
		if (!workerToDelete) return;

		const loadingToastId = toast.loading("Eliminando trabajador...");

		const response = await dispatch(deleteWorker(workerToDelete.id));
		if (response.success) {
			await dispatch(getAllWorkers());
			toast.dismiss(loadingToastId);
			toast.success(response.message);
			setDeleteModalOpen(false);
			setWorkerToDelete(null);
		} else {
			toast.dismiss(loadingToastId);
			toast.error(response.message);
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
			<div className="flex justify-center md:justify-end pb-4 md:pb-2">
				<button
					type="button"
					onClick={toggleModal}
					className="hover:scale-105 cursor-pointer font-chivo text-white bg-shark-500 text-md font-semibold p-2 rounded-lg hover:bg-shark-600 transition-all"
				>
					Crear nuevo trabajador
				</button>
			</div>
			<p className="text-lg font-semibold pb-4">Trabajadores: </p>
			{workers?.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-80 text-gray-500 gap-2">
					<Users className="w-10 h-10" />
					<p className="text-lg font-medium text-center">
						No hay trabajadores registrados
					</p>
				</div>
			) : (
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{workers?.map((worker, index) => (
						<article
							key={worker?.id ?? `worker-${index}`}
							className="p-4 border border-t-4 border-shark-500 rounded shadow bg-white"
						>
							<p className="flex items-start gap-2 break-all w-full">
								<User className="h-5 w-5 shrink-0" />
								<span className="break-words w-full">{worker.name}</span>
							</p>
							<p className="flex items-start gap-2 break-all w-full">
								<Mail className="h-5 w-5 shrink-0" />
								<span className="break-words w-full">{worker.gmail}</span>
							</p>
							<p className="flex items-start gap-2 break-all w-full">
								<Phone className="h-5 w-5 shrink-0" />
								<span className="break-words w-full tracking-wider">
									{worker.phoneNumber}
								</span>
							</p>
							<div className="flex gap-2 justify-end mt-2">
								<button
									type="button"
									onClick={() => {
										setWorkerToEdit(worker);
										setFormData({
											name: worker.name,
											gmail: worker.gmail,
											phoneNumber: worker.phoneNumber,
										});
										setEditModalOpen(true);
										setError("");
									}}
									className="hover:scale-105 flex px-2 items-center gap-1 font-chivo cursor-pointer text-white bg-shark-500 text-md font-semibold p-1 rounded-lg hover:bg-shark-600 transition-all"
								>
									<Pencil className="w-4 h-4" />
									<span>Editar</span>
								</button>
								<button
									type="button"
									onClick={() => {
										setWorkerToDelete(worker);
										setDeleteModalOpen(true);
									}}
									className="hover:scale-105 flex px-2 items-center gap-1 font-chivo cursor-pointer text-white bg-shark-500 text-md font-semibold p-1 rounded-lg hover:bg-shark-600 transition-all"
								>
									<X className="w-5 h-5" />
									<span>Eliminar</span>
								</button>
							</div>
						</article>
					))}
				</section>
			)}
			<CreateWorkerModal
				isOpen={modalOpen}
				onClose={toggleModal}
				onSubmit={handleCreateWorker}
				formData={formData}
				error={error}
				handleChange={handleChange}
			/>
			<DeleteWorkerModal
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onDelete={handleDeleteWorker}
				workerToDelete={workerToDelete}
			/>
			<EditWorkerModal
				isOpen={editModalOpen}
				onClose={() => {
					setEditModalOpen(false);
					setError("");
				}}
				onSubmit={handleEditWorker}
				formData={formData}
				error={error}
				handleChange={handleChange}
			/>
		</section>
	);
};

export default Workers;
