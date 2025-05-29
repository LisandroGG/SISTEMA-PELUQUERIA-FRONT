import { format, parseISO } from "date-fns";
import { CalendarSearch, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getReservationsByGmail } from "../../redux/actions.js";
import ErrorMessage from "../Common/ErrorMessage.jsx";
import Input from "../Common/Input.jsx";
import Loading from "../Common/Loading.jsx";
import { validateGmail } from "../Utils/Validations.js";

const ReservationsModal = ({ isOpen, onClose, user }) => {
	const dispatch = useDispatch();
	const [gmail, setGmail] = useState("");
	const [error, setError] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const reservations = useSelector((state) => state.reservations.reservations);
	const isLoadingReservations = useSelector(
		(state) => state.isLoadingReservations,
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!gmail) {
			setError("Complete los campos");
		}

		const gmailError = validateGmail(gmail);
		if (gmailError) return setError(gmailError);

		const loadingToastId = toast.loading("Cargando turnos...");

		try {
			const response = await dispatch(getReservationsByGmail(gmail));
			setSubmitted(true);
			if (response.success) {
				toast.success("Turnos obtenidos");
				toast.dismiss(loadingToastId);
				setError("");
			} else {
				toast.dismiss(loadingToastId);
				setError(response.message);
			}
		} catch (error) {
			toast.dismiss(loadingToastId);
			toast.error("Hubo un problema inesperado. Intente nuevamente");
		}
	};

	useEffect(() => {
		if (user) {
			setGmail(user.gmail);
		}
	}, [user]);

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div
			className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2"
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") onClose();
			}}
		>
			<div
				className="bg-white w-96 rounded-lg shadow-lg p-6 relative"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") onClose();
				}}
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
				>
					<X />
				</button>
				<h2 className="text-2xl font-bold mb-4 text-center">Mis Turnos</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						label="Gmail"
						type="email"
						value={gmail}
						name="gmail"
						onChange={(e) => setGmail(e.target.value)}
						placeholder="Correo electrónico"
					/>
					<ErrorMessage message={error} />
					<button
						type="submit"
						className="p-2 cursor-pointer text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all flex items-center gap-1 w-full"
					>
						<CalendarSearch className="h-5 w-5" /> Ver turnos
					</button>
				</form>

				{isLoadingReservations && submitted && (
					<Loading loadingText={"Cargando turnos..."} />
				)}

				{!isLoadingReservations &&
					Array.isArray(reservations) &&
					reservations?.length > 0 && (
						<div className="max-h-64 overflow-y-auto mt-4 px-2">
							<ul className="mt-4">
								{reservations.map((r) => (
									<li key={r.id} className="p-2 text-sm">
										<p>
											<strong>Fecha:</strong>{" "}
											{r.date && format(parseISO(r.date), "dd/MM/yyyy")}
										</p>
										<p>
											<strong>Hora:</strong> {r.startTime.slice(0, 5)}
										</p>
										<p>
											<strong>Peluquero:</strong> {r.worker.name}
										</p>
										<p>
											<strong>Servicio:</strong> {r.service.name} (
											{r.service.duration} min)
										</p>
									</li>
								))}
							</ul>
						</div>
					)}
			</div>
		</div>,
		document.getElementById("modal-root"),
	);
};

export default ReservationsModal;
