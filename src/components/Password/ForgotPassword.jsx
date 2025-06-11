import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/actions";
import ErrorMessage from "../Common/ErrorMessage.jsx";
import Form from "../Common/Form.jsx";
import FormHeader from "../Common/FormHeader.jsx";
import FormText from "../Common/FormText.jsx";
import Input from "../Common/Input.jsx";
import { validateGmail } from "../Utils/Validations.js";

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		gmail: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.gmail) {
			return setError("Complete los campos");
		}

		const gmailError = validateGmail(formData.gmail);
		if (gmailError) return setError(gmailError);

		const loadingToastId = toast.loading("Enviando correo...");

		try {
			const response = await dispatch(forgotPassword(formData));
			if (response.success) {
				toast.dismiss(loadingToastId);
				toast.success(response.message);
				navigate("/login");
			} else {
				toast.dismiss(loadingToastId);
				setError(response.message);
			}
		} catch (error) {
			toast.dismiss(loadingToastId);
			toast.error("Hubo un problema inesperado. Intente nuevamente");
		}
	};
	return (
		<div className="min-h-screen grid place-content-center bg-form-gradient">
			<Form onSubmit={handleSubmit} submitText={"Recuperar contrseña"} title="">
				<FormHeader
					title="Bienvenido a AF Peluquería"
					subtitle="Recuperar contraseña"
				/>
				<Input
					label="Gmail"
					name="gmail"
					type="email"
					value={formData.gmail}
					onChange={handleChange}
					placeholder="Correo electrónico"
				/>
				<ErrorMessage message={error} />
				<div>
					<FormText linkText="Inicia sesión" to="/login" />
				</div>
			</Form>
		</div>
	);
};

export default ForgotPassword;
