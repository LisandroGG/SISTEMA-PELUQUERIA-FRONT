import React from "react";

import { Toaster } from "react-hot-toast";
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

import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy.jsx";
import Reservation from "./components/Reservation/Reservation.jsx";

function App() {
	return (
		<div className="min-h-screen font-montserrat">
			<Toaster position="top-center" />
			<Routes>
				<Route path="/" element={<Layout />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
