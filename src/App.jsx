import React, { useEffect, useRef } from "react";

import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import AdminPanel from "./components/Admin/AdminPanel";
import Layout from "./components/Layout/Layout.jsx";
import Login from "./components/Login/Login.jsx";
import ChangePassword from "./components/Password/ChangePassword.jsx";
import ForgotPassword from "./components/Password/ForgotPassword.jsx";
import Register from "./components/Register/Register.jsx";
import CancelReservation from "./components/Reservation/CancelReservation.jsx";
import PrivateRoute from "./components/Routes/PrivateRoute.jsx";
import PublicRoute from "./components/Routes/PublicRoute.jsx";
import TokenRoute from "./components/Routes/TokenRoute.jsx";

import Hours from "./components/Admin/Hours/index.jsx";
import Reservations from "./components/Admin/Reservations/Reservations.jsx";
import Services from "./components/Admin/Services/Services.jsx";
import Workers from "./components/Admin/Workers/Workers.jsx";

import Reservation from "./components/Reservation/Reservation.jsx";

import { getUserSession } from "./redux/actions.js";

function App() {
	const user = useSelector((state) => state.user);
	const isLoadingSession = useSelector((state) => state.isLoadingSession);
	const executed = useRef(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (executed.current) return;
		executed.current = true;
		if (!user) {
			dispatch(getUserSession());
		}
	}, [dispatch, user]);

	if (isLoadingSession) {
		return null;
	}

	return (
		<div className="min-h-screen font-montserrat">
			<Toaster position="top-center" />
			<Routes>
				<Route path="/" element={<Layout />} />
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>
				<Route
					path="/forgotPassword"
					element={
						<PublicRoute>
							<ForgotPassword />
						</PublicRoute>
					}
				/>
				<Route
					path="/cancel"
					element={
						<TokenRoute>
							<CancelReservation />
						</TokenRoute>
					}
				/>
				<Route
					path="/admin"
					element={
						<PrivateRoute requiredRole="admin">
							<AdminPanel />
						</PrivateRoute>
					}
				>
					<Route index element={<Reservations />} />
					<Route path="services" element={<Services />} />
					<Route path="workers" element={<Workers />} />
					<Route path="hours" element={<Hours />} />
				</Route>
				<Route
					path="/changePassword"
					element={
						<TokenRoute>
							<ChangePassword />
						</TokenRoute>
					}
				/>
				<Route path="/reservations" element={<Reservation />} />
			</Routes>
		</div>
	);
}

export default App;
