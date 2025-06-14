import ErrorMessage from "@/Common/ErrorMessage.jsx";
import Input from "@/Common/Input.jsx";
import StepCompont from "@/Common/StepComponent.jsx";
import {
	validateGmail,
	validateName,
	validatePhone,
} from "@/Utils/Validations.js";
import { format, parseISO } from "date-fns";
import { ArrowBigLeft, CalendarCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Step4 = ({ setStep, formData, setFormData, onSubmit }) => {
	const user = useSelector((state) => state.user);
	const [error, setError] = useState("");
	const services = useSelector((state) => state.services);
	const workers = useSelector((state) => state.workers);
	useEffect(() => {
		if (user) {
			setFormData((prev) => ({
				...prev,
				clientName: prev.name || user.name || "",
				clientGmail: prev.gmail || user.gmail || "",
				clientPhoneNumber: prev.phoneNumber || user.phoneNumber || "",
			}));
		}
	}, [user, setFormData]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleBack = () => {
		setStep(3);
	};

	const handleSubmit = () => {
		if (
			!formData.clientGmail ||
			!formData.clientName ||
			!formData.clientPhoneNumber
		)
			return setError("Complete los campos");

		const nameError = validateName(formData.clientName);
		if (nameError) return setError(nameError);

		const gmailError = validateGmail(formData.clientGmail);
		if (gmailError) return setError(gmailError);

		const phoneError = validatePhone(formData.clientPhoneNumber);
		if (phoneError) return setError(phoneError);

		onSubmit();
	};

	return (
		<StepCompont
			step={"Tus datos:"}
			stepSelected={[
				formData.serviceId &&
					services.find((s) => s.id === formData.serviceId)?.name,
				formData.workerId &&
					workers.find((w) => w.id === formData.workerId)?.name,
				formData.date && format(parseISO(formData.date), "dd/MM/yyyy"),
				formData.startTime,
			]
				.filter(Boolean)
				.join(" | ")}
		>
			<Input
				label="Nombre"
				name="clientName"
				placeholder="Nombre"
				value={formData.clientName}
				onChange={handleChange}
			/>
			<Input
				label="Gmail"
				name="clientGmail"
				placeholder="Correo electrónico"
				value={formData.clientGmail}
				onChange={handleChange}
			/>
			<Input
				label="Teléfono"
				name="clientPhoneNumber"
				placeholder="Teléfono"
				value={formData.clientPhoneNumber}
				onChange={handleChange}
			/>

			<ErrorMessage message={error} />

			<div className="flex flex-col gap-2 justify-between items-center mt-4">
				<button
					onClick={handleBack}
					className="cursor-pointer text-white bg-shark-500 text-md font-semibold p-2 rounded-lg hover:bg-shark-600 transition-all flex w-full md:w-60"
					type="button"
				>
					<ArrowBigLeft />
					<span>Volver al paso anterior</span>
				</button>
				<button
					type="submit"
					onClick={handleSubmit}
					className="p-2 cursor-pointer text-white bg-shark-500 hover:bg-shark-600 text-md font-semibold rounded-lg transition-all flex gap-1 w-full md:w-54"
				>
					<CalendarCheck className="w-5" />
					<span>Confirmar reserva</span>
				</button>
			</div>
		</StepCompont>
	);
};

export default Step4;
