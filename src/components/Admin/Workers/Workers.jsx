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
import { Pencil, X } from "lucide-react";
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
			<div className="">
				<button type="button" onClick={toggleModal} className="">
					Crear nuevo trabajador
				</button>
			</div>
			<p>Trabajadores: </p>
			{workers?.length === 0 ? (
				<p>No hay trabajadores disponibles</p>
			) : (
				<section>
					{workers?.map((worker, index) => (
						<article key={worker?.id ?? `worker-${index}`}>
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
							>
								<Pencil className="w-5 h-5" />
							</button>
							<button
								type="button"
								onClick={() => {
									setWorkerToDelete(worker);
									setDeleteModalOpen(true);
								}}
							>
								<X className="w-6 h-6" />
							</button>
							<p>{worker.name}</p>
							<p>{worker.gmail}</p>
							<p>{worker.phoneNumber}</p>
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
				onClose={() => setEditModalOpen(false)}
				onSubmit={handleEditWorker}
				formData={formData}
				error={error}
				handleChange={handleChange}
			/>
		</section>
	);
};

export default Workers;
