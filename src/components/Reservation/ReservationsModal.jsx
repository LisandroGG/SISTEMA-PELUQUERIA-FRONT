import ErrorMessage from "@/Common/ErrorMessage.jsx";
import Input from "@/Common/Input.jsx";
import Loading from "@/Common/Loading.jsx";
import Modal from "@/Common/Modal.jsx";
import { validateGmail } from "@/Utils/Validations.js";
import { getReservationsByGmail } from "@redux/actions.js";
import { format, parseISO } from "date-fns";
import { CalendarSearch, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

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

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Mis Turnos">
			<button
				type="button"
				onClick={onClose}
				className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
			>
				<X />
			</button>
			<form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
					className="p-2 cursor-pointer w-full text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all flex items-center justify-center gap-1"
				>
					<CalendarSearch className="h-5 w-5" /> Ver turnos
				</button>
			</form>

			{isLoadingReservations && submitted && (
				<Loading loadingText={"Cargando turnos..."} />
			)}

			{!isLoadingReservations &&
				Array.isArray(reservations) &&
				reservations.length > 0 && (
					<div className="max-h-64 overflow-y-auto mt-4 px-2 font-chivo">
						<ul className="mt-4 space-y-2">
							{reservations.map((r) => (
								<li key={r.id} className="p-2 border rounded text-sm">
									<p>
										<strong>Fecha:</strong>{" "}
										{format(parseISO(r.date), "dd/MM/yyyy")}
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
		</Modal>
	);
};

export default ReservationsModal;
