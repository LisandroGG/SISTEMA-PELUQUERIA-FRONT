import Footer from "@/Footer/Footer.jsx";
import Home from "@/Home/Home.jsx";
import Nav from "@/Nav/Nav.jsx";
import { logoutUser } from "@redux/actions.js";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Layout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);

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
		<div className="bg-bgbody">
			<Nav user={user} handleLogout={handleLogout} />
			<Home />
			<Footer />
		</div>
	);
};

export default Layout;
