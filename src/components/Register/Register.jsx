import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/actions.js";
import ErrorMessage from "../Common/ErrorMessage.jsx";
import Form from "../Common/Form.jsx";
import Input from "../Common/Input.jsx";
import {
	validateGmail,
	validatePassword,
	validatePhone,
} from "../Utils/Validations.js";

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
		<div>
			<Form
				onSubmit={handleSubmit}
				submitText={"Registrarse"}
				title={"Crear cuenta"}
			>
				<Input
					label="Nombre"
					name="name"
					type="text"
					value={formData.name}
					onChange={handleChange}
				/>
				<Input
					label="Gmail"
					name="gmail"
					type="email"
					value={formData.gmail}
					onChange={handleChange}
				/>
				<Input
					label="Telefono"
					name="phoneNumber"
					type="tel"
					value={formData.phoneNumber}
					onChange={handleChange}
				/>
				<Input
					label="Contraseña"
					name="password"
					type="password"
					value={formData.password}
					onChange={handleChange}
				/>
				<ErrorMessage message={error} />
				<div>
					<h1 className="font-semibold">
						¿Ya tienes una cuenta?<a href="/login"> Inicia sesion</a>
					</h1>
				</div>
			</Form>
		</div>
	);
};

export default Register;
