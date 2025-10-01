import MapIframe from "@/Map/Map.jsx";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="p-4 bg-shark-500 text-white shadow-xl text-center lg:text-left">
			<div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-4">
				<section className="font-bold flex flex-col md:flex-row items-center justify-between pb-4 mb-4 border-b-2 border-shark-400 gap-1">
					<p className="text-xl font-chivo">AF Peluquería</p>
					<div className="flex gap-2">
						<a href="https://api.whatsapp.com/send?phone=+543472438424&text=%F0%9F%91%8BHola%20Fede,%20vengo%20de%20tu%20pagina%20web!!">
							<img
								src="assets/whatsappLogo.svg"
								alt="whatsapp"
								className="w-6 h-6"
							/>
						</a>
						<a
							href="https://www.instagram.com/peluqueria.af/"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="assets/instagramLogo.svg"
								alt="whatsapp"
								className="w-6 h-6"
							/>
						</a>
					</div>
				</section>
				<section className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<section className="flex flex-col">
						<p className="font-bold text-lg mb-4">Enlaces</p>
						<Link
							to="/reservations"
							className="font-semibold text-sm hover:text-white/80 transition-all"
						>
							Reservar turno
						</Link>
						<Link
							to="/privacy-policy"
							className="font-semibold text-sm hover:text-white/80 transition-all"
						>
							Política de privacidad
						</Link>
					</section>
					<section className="text-center">
						<p className="font-bold text-lg mb-4">Contacto</p>
						<a
							href="mailto:federicoalvarez728@gmail.com"
							target="_blank"
							className="font-semibold text-sm hover:text-white/80 transition-all"
							rel="noreferrer"
						>
							federicoalvarez728@gmail.com
						</a>
					</section>
					<section className="md:col-span-1 lg:col-span-1 lg:text-right">
						<p className="font-bold text-lg mb-4">Desarrollado por</p>
						<a
							href="https://lisandrodev.vercel.app/"
							target="_blank"
							className="font-semibold text-sm hover:text-white/80 transition-all"
							rel="noreferrer"
						>
							Lisandro Pereyra
						</a>
					</section>
				</section>
			</div>
		</footer>
	);
};

export default Footer;
