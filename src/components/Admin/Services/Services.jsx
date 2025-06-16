import ErrorMessage from "@/Common/ErrorMessage.jsx";
import Input from "@/Common/Input.jsx";
import Loading from "@/Common/Loading.jsx";
import Modal from "@/Common/Modal.jsx";
import {
	validateCost,
	validateDuration,
	validateServiceName,
} from "@/Utils/Validations.js";
import {
	createService,
	deleteService,
	editService,
	getAllWorkers,
	getServices,
} from "@redux/actions.js";
import { Pencil, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CreateServiceModal from "./Modals/CreateServiceModal";
import DeleteServiceModal from "./Modals/DeleteServiceModal";
import EditServiceModal from "./Modals/EditServiceModal";

const Services = () => {
	const dispatch = useDispatch();
	const executed = useRef(false);
	const services = useSelector((state) => state.services);
	const isLoadingServices = useSelector((state) => state.isLoadingServices);
	const workers = useSelector((state) => state.workers);
	const [modalOpen, setModalOpen] = useState(false);
	const [error, setError] = useState("");
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [serviceToDelete, setServiceToDelete] = useState(null);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [serviceToEdit, setServiceToEdit] = useState(null);
	const [formData, setFormData] = useState({
		serviceName: "",
		serviceCost: "",
		duration: "",
		workerIds: [],
	});

	const toggleModal = () => {
		setModalOpen(!modalOpen);
		cleanData();
		setError("");
	};

	const cleanData = () =>
		setFormData({
			name: "",
			cost: "",
			duration: "",
			workerIds: [],
		});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCreateService = async (e) => {
		e.preventDefault();

		if (
			!formData.name ||
			!formData.cost ||
			!formData.duration ||
			!formData.workerIds ||
			formData.workerIds.length === 0
		) {
			return setError("Complete los campos");
		}

		const serviceNameError = validateServiceName(formData.name);
		if (serviceNameError) return setError(serviceNameError);

		const costError = validateCost(formData.cost);
		if (costError) return setError(costError);

		const durationError = validateDuration(formData.duration);
		if (durationError) return setError(durationError);

		if (formData.workerIds.length === 0) {
			return setError("Debe asignar al menos un trabajador");
		}

		const loadingToastId = toast.loading("Creando servicio...");

		try {
			const response = await dispatch(createService(formData));
			if (response.success) {
				await dispatch(getServices());
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

	const handleEditService = async (e) => {
		e.preventDefault();

		if (
			!formData.name ||
			!formData.cost ||
			!formData.duration ||
			formData.workerIds.length === 0
		) {
			return setError("Complete todos los campos");
		}

		const nameError = validateServiceName(formData.name);
		if (nameError) return setError(nameError);

		const costError = validateCost(formData.cost);
		if (costError) return setError(costError);

		const durationError = validateDuration(formData.duration);
		if (durationError) return setError(durationError);

		const toastId = toast.loading("Editando servicio...");
		try {
			const response = await dispatch(editService(formData, serviceToEdit.id));
			if (response.success) {
				toast.success(response.message);
				dispatch(getServices());
				setEditModalOpen(false);
			} else {
				toast.error(response.message);
			}
		} catch {
			toast.error("Hubo un error inesperado");
		} finally {
			toast.dismiss(toastId);
		}
	};

	const handleDeleteService = async () => {
		if (!serviceToDelete) return;

		const toastId = toast.loading("Eliminando servicio...");
		try {
			const res = await dispatch(deleteService(serviceToDelete.id));
			if (res.success) {
				toast.success(res.message);
				dispatch(getServices());
			} else {
				toast.error(res.message);
			}
		} catch {
			toast.error("Hubo un error inesperado");
		} finally {
			toast.dismiss(toastId);
			setDeleteModalOpen(false);
		}
	};

	useEffect(() => {
		if (executed.current) return;
		executed.current = true;

		dispatch(getServices());
		dispatch(getAllWorkers());
	}, [dispatch]);

	if (isLoadingServices) {
		return (
			<div className="min-h-screen grid place-content-center">
				<Loading loadingText={"Cargando servicios..."} />
			</div>
		);
	}

	return (
		<section className="max-w-7xl mx-auto p-4 md:px-8 lg:px-4 px-5">
			<div className="">
				<button type="button" onClick={toggleModal} className="">
					Crear nuevo servicio
				</button>
			</div>
			<p>Servicios: </p>
			{services?.length === 0 ? (
				<p>No hay servicios disponibles.</p>
			) : (
				<section>
					{services?.map((service, index) => (
						<article key={service?.id ?? `service-${index}`}>
							<button
								type="button"
								onClick={() => {
									setServiceToEdit(service);
									setFormData({
										name: service.name,
										cost: service.cost,
										duration: service.duration,
										workerIds: service.Workers.map((w) => w.id),
									});
									setEditModalOpen(true);
								}}
							>
								<Pencil className="w-5 h-5" />
							</button>
							<button
								type="button"
								onClick={() => {
									setServiceToDelete(service);
									setDeleteModalOpen(true);
								}}
							>
								<X className="w-6 h-6" />
							</button>
							<p>{service.name}</p>
							<p>{service.cost}</p>
							<p>{service.duration}</p>
							<div className="mt-2">
								<p>Trabajadores:</p>
								<ul className="">
									{(service.Workers ?? []).map((worker) => (
										<li key={worker.id}>{worker.name}</li>
									))}
								</ul>
							</div>
						</article>
					))}
				</section>
			)}
			<CreateServiceModal
				isOpen={modalOpen}
				onClose={toggleModal}
				onSubmit={handleCreateService}
				formData={formData}
				handleChange={handleChange}
				error={error}
				workers={workers}
				setFormData={setFormData}
			/>
			<DeleteServiceModal
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onDelete={handleDeleteService}
				serviceToDelete={serviceToDelete}
			/>
			<EditServiceModal
				isOpen={editModalOpen}
				onClose={() => setEditModalOpen(false)}
				onSubmit={handleEditService}
				formData={formData}
				handleChange={handleChange}
				error={error}
				workers={workers}
				setFormData={setFormData}
			/>
		</section>
	);
};

export default Services;
