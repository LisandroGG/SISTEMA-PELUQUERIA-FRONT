import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@redux/actions.js";
import ErrorMessage from "@/Common/ErrorMessage.jsx";
import Form from "@/Common/Form.jsx";
import FormHeader from "@/Common/FormHeader.jsx";
import FormText from "@/Common/FormText.jsx";
import Input from "@/Common/Input.jsx";
import { validateGmail, validatePassword } from "@/Utils/Validations.js";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const [formData, setFormData] = useState({
		gmail: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.gmail || !formData.password) {
			return setError("Complete los campos");
		}
		const gmailError = validateGmail(formData.gmail);
		if (gmailError) return setError(gmailError);

		const passwordError = validatePassword(formData.password);
		if (passwordError) return setError(passwordError);

		const loadingToastId = toast.loading("Iniciando Sesion...");

		try {
			const response = await dispatch(loginUser(formData));
			if (response.success) {
				toast.dismiss(loadingToastId);
				toast.success(response.message);
				navigate("/");
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
			<Form onSubmit={handleSubmit} submitText={"Iniciar Sesión"} title={""}>
				<FormHeader
					title="Bienvenido a AF Peluquería"
					subtitle="Iniciar sesión"
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
					label="Contraseña"
					name="password"
					type="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Contraseña"
					autocomplete="current-password"
				/>
				<ErrorMessage message={error} />
				<div className="flex flex-col text-center justify-between gap-2">
					<FormText
						text=""
						linkText="Olvide mi contraseña"
						to="/forgotPassword"
					/>
					<FormText
						text="¿No tienes una cuenta?"
						linkText="Regístrate"
						to="/register"
					/>
				</div>
			</Form>
		</div>
	);
};

export default Login;
