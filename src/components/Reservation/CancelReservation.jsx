import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cancelReservation } from "../../redux/actions";
import FormHeader from "../Common/FormHeader";
import Loading from "../Common/Loading";

const CancelReservation = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(null);
	const executed = useRef(false);

	useEffect(() => {
		if (!token) {
			toast.error("Token inválido o ausente.");
			setLoading(false);
			return;
		}
		if (executed.current) return;
		executed.current = true;

		dispatch(cancelReservation(token))
			.then((res) => {
				if (res.success) {
					setSuccess(true);
					toast.success(res.message || "Reserva cancelada correctamente.");
				} else {
					setSuccess(false);
					toast.error(res.message || "No se pudo cancelar la reserva.");
				}
			})
			.catch(() => {
				setSuccess(false);
				toast.error("Error al conectar con el servidor.");
			})
			.finally(() => setLoading(false));
	}, [token, dispatch]);

	useEffect(() => {
		if (success !== null) {
			const timer = setTimeout(() => {
				navigate("/");
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [success, navigate]);

	if (loading)
		return (
			<div className="min-h-screen grid place-content-center bg-form-gradient">
				<Loading loadingText={"Cancelando reserva..."} />
			</div>
		);

	if (success)
		return (
			<div className="min-h-screen grid place-content-center bg-form-gradient">
				<FormHeader
					title={"Reserva cancelada"}
					subtitle={"Tu reserva ha sido cancelada con éxito"}
					subtitle2={"Seras redirigido al inicio en unos segundos."}
				/>
			</div>
		);

	return (
		<div className="min-h-screen grid place-content-center bg-form-gradient">
			<FormHeader
				title={"No se pudo cancelar la reserva"}
				subtitle={"El token es inválido o la reserva ya fue cancelada."}
				subtitle2={"Seras redirigido al inicio en unos segundos."}
			/>
		</div>
	);
};

export default CancelReservation;
