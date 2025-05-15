import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<h1>Bienvenido a la peluquería</h1>
			<Link to="/reservations">Hacer una reserva</Link>
		</div>
	);
};

export default Home;
