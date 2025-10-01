import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";
import Step3 from "./Step3.jsx";
import Step4 from "./Step4.jsx";

import { createReservation } from "@redux/actions.js";

const Reservation = () => {
	const [step, setStep] = useState(1);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		workerId: "",
		serviceId: "",
		date: "",
		startTime: "",
		clientName: "",
		clientGmail: "",
		clientPhoneNumber: "",
	});

	const dispatch = useDispatch();

	const handleReservationSubmit = async () => {
		const loadingToastId = toast.loading("Reservando Turno...");
		try {
			const response = await dispatch(createReservation(formData));
			if (response.success) {
				toast.dismiss(loadingToastId);
				toast.success(response.message);
				navigate("/");
			} else {
				toast.dismiss(loadingToastId);
				toast.error(response.message);
			}
		} catch (error) {
			toast.dismiss(loadingToastId);
			toast.error("Hubo un problema inesperado. Intente nuevamente");
		}
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<Step1
						setStep={setStep}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 2:
				return (
					<Step2
						setStep={setStep}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 3:
				return (
					<Step3
						setStep={setStep}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 4:
				return (
					<Step4
						setStep={setStep}
						formData={formData}
						setFormData={setFormData}
						onSubmit={handleReservationSubmit}
					/>
				);
			default:
				return null;
		}
	};
	return (
		<section
			aria-labelledby="reservation"
			className="min-h-screen grid place-content-center bg-form-gradient"
		>
			{renderStep()}
		</section>
	);
};

export default Reservation;
