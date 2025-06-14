import ErrorMessage from "@/Common/ErrorMessage.jsx";
import Form from "@/Common/Form.jsx";
import FormHeader from "@/Common/FormHeader.jsx";
import Input from "@/Common/Input.jsx";
import { validatePassword } from "@/Utils/Validations.js";
import { changePassword } from "@redux/actions.js";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const ChangePassword = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		newPassword: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.newPassword) {
			return setError("Complete los campos");
		}

		const passwordError = validatePassword(formData.newPassword);
		if (passwordError) return setError(passwordError);

		const loadingToastId = toast.loading("Cambiando contraseña...");

		try {
			const response = await dispatch(changePassword(token, formData));
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
			<Form
				onSubmit={handleSubmit}
				submitText={"Actualizar contraseña"}
				title={""}
			>
				<FormHeader
					title="Bienvenido a AF Peluquería"
					subtitle="Cambiar contraseña"
				/>
				<Input
					label="Nueva contraseña"
					name="newPassword"
					type="password"
					value={formData.newPassword}
					onChange={handleChange}
					placeholder="Nueva contraseña"
				/>
				<ErrorMessage message={error} />
			</Form>
		</div>
	);
};

export default ChangePassword;
