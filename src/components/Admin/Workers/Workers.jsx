import ErrorMessage from "@/Common/ErrorMessage";
import Input from "@/Common/Input";
import Loading from "@/Common/Loading";
import Modal from "@/Common/Modal";
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

		try {
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
		} catch (error) {
			toast.dismiss(loadingToastId);
			toast.error("Hubo un problema inesperado. Intente nuevamente");
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

		try {
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
		} catch (error) {
			toast.dismiss(loadingToastId);
			toast.error("Hubo un problema inesperado. Intente nuevamente");
		}
	};

	const handleDeleteWorker = async () => {
		if (!workerToDelete) return;

		const loadingToastId = toast.loading("Eliminando trabajador...");

		try {
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
		} catch (error) {
			toast.dismiss(loadingToastId);
			toast.error("Hubo un problema inesperado. Intente nuevamente");
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
			<Modal
				isOpen={modalOpen}
				onClose={toggleModal}
				title={"Crear nuevo trabajador"}
			>
				<button
					type="button"
					onClick={toggleModal}
					className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
				>
					<X />
				</button>
				<form onSubmit={handleCreateWorker}>
					<Input
						label="Nombre del trabajador"
						name="name"
						type="text"
						value={formData.name}
						onChange={handleChange}
						placeholder="Nombre"
					/>
					<Input
						label="Gmail del trabajador"
						name="gmail"
						type="email"
						value={formData.gmail}
						onChange={handleChange}
						placeholder="Correo electrónico"
					/>
					<Input
						label="Teléfono"
						name="phoneNumber"
						type="tel"
						value={formData.phoneNumber}
						onChange={handleChange}
						placeholder="Teléfono"
					/>
					<ErrorMessage message={error} />
					<div>
						<button type="button" onClick={toggleModal}>
							Cancelar
						</button>
						<button type="submit">Crear</button>
					</div>
				</form>
			</Modal>
			<Modal
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				title={"Eliminar trabajador"}
			>
				<p>¿Estás seguro de que quieres eliminar a {workerToDelete?.name}?</p>
				<div className="mt-4 flex justify-end gap-4">
					<button
						type="button"
						onClick={() => setDeleteModalOpen(false)}
						className=""
					>
						Cancelar
					</button>
					<button type="button" onClick={handleDeleteWorker} className="">
						Eliminar
					</button>
				</div>
			</Modal>
			<Modal
				isOpen={editModalOpen}
				onClose={() => setEditModalOpen(false)}
				title={"Editar trabajador"}
			>
				<button
					type="button"
					onClick={() => setEditModalOpen(false)}
					className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
				>
					<X />
				</button>
				<form className="flex flex-col gap-4" onSubmit={handleEditWorker}>
					<Input
						label="Correo Gmail"
						name="gmail"
						type="email"
						value={formData.gmail}
						onChange={handleChange}
						placeholder="Correo electrónico"
					/>
					<Input
						label="Teléfono"
						name="phoneNumber"
						type="tel"
						value={formData.phoneNumber}
						onChange={handleChange}
						placeholder="Teléfono"
					/>

					{error && <ErrorMessage message={error} />}

					<div className="flex justify-between mt-3">
						<button type="submit">Guardar cambios</button>
					</div>
				</form>
			</Modal>
		</section>
	);
};

export default Workers;
