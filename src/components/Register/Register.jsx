import ErrorMessage from "@/Common/ErrorMessage.jsx";
import Form from "@/Common/Form.jsx";
import FormHeader from "@/Common/FormHeader.jsx";
import FormText from "@/Common/FormText.jsx";
import Input from "@/Common/Input.jsx";
import {
	validateGmail,
	validatePassword,
	validatePhone,
} from "@/Utils/Validations.js";
import { registerUser } from "@redux/actions.js";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const [formData, setFormData] = useState({
		name: "",
		gmail: "",
		phoneNumber: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!formData.gmail ||
			!formData.password ||
			!formData.phoneNumber ||
			!formData.name
		) {
			return setError("Complete los campos");
		}
		if (!formData.name) {
			return setError("Ingrese su nombre");
		}
		const gmailError = validateGmail(formData.gmail);
		if (gmailError) return setError(gmailError);

		const phoneError = validatePhone(formData.phoneNumber);
		if (phoneError) return setError(phoneError);

		const passwordError = validatePassword(formData.password);
		if (passwordError) return setError(passwordError);

		const loadingToastId = toast.loading("Creando cuenta...");

		try {
			const response = await dispatch(registerUser(formData));
			if (response.success) {
				toast.dismiss(loadingToastId);
				toast.success("Cuenta creada con éxito!");
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
			<Form onSubmit={handleSubmit} submitText={"Registrarse"} title={""}>
				<FormHeader title="Bienvenido a AF Peluquería" subtitle="Registrarse" />
				<Input
					label="Nombre"
					name="name"
					type="text"
					value={formData.name}
					onChange={handleChange}
					placeholder="Nombre"
				/>
				<Input
					label="Gmail"
					name="gmail"
					type="email"
					value={formData.gmail}
					onChange={handleChange}
					placeholder="Correo electrónico"
					autocomplete="email"
				/>
				<Input
					label="Teléfono"
					name="phoneNumber"
					type="tel"
					value={formData.phoneNumber}
					onChange={handleChange}
					placeholder="Teléfono"
				/>
				<Input
					label="Contraseña"
					name="password"
					type="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Contraseña"
					autocomplete="currrent-password"
				/>
				<ErrorMessage message={error} />
				<div>
					<FormText
						text="¿Ya tienes una cuenta?"
						linkText="Inicia sesión"
						to="/login"
					/>
				</div>
			</Form>
		</div>
	);
};

export default Register;
