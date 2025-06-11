import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions.js";
import AdminNav from "./AdminNav";

const AdminPanel = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		const loadingToastId = toast.loading("Cerrando Sesion...");
		try {
			const response = await dispatch(logoutUser());
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
	return (
		<div className="flex flex-col min-h-screen bg-bgbody">
			<AdminNav handleLogout={handleLogout} />
			<main className="h-screen mt-18">
				<section>
					<Outlet />
				</section>
			</main>
		</div>
	);
};

export default AdminPanel;
