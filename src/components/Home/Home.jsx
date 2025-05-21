import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
	return (
		<div className="h-screen mt-18">
			<h2>
				user: {user ? user.name : "deslogueado"} role:{" "}
				{user ? user.role : "deslogueado"}
			</h2>
			<h1>Bienvenido a la peluquería</h1>
			<Link to="/reservations">Hacer una reserva</Link>
		</div>
	);
};

export default Home;
