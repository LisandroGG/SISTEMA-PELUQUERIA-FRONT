import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import MapIframe from "../Map/Map";

const Home = () => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: false,
	};

	const images = [
		"assets/foto1.webp",
		"assets/foto2.webp",
		"assets/foto3.webp",
		"assets/foto4.webp",
		"assets/foto5.webp",
		"assets/foto6.webp",
		"assets/foto7.webp",
		"assets/foto8.webp",
		"assets/foto9.webp",
	];

	return (
		<main className="max-w-7xl mx-auto mt-18 p-4 md:px-8 lg:px-4 px-5 mb-10">
			<section className="py-6 md:py-15 flex flex-col md:flex-row items-center justify-center text-center gap-8">
				<div className="max-w-[35rem] font-chivo">
					<p className="text-4xl md:text-5xl font-bold tracking-tight text-shark-600 mb-10">
						💈Bienvenidos a AF Peluquería
					</p>
					<div className="text-2xl font-medium text-shark-300 space-y-1">
						<p>Para nosotros "Cada Momento Importa".</p>
						<p>
							Ofrecemos cortes de pelo modernos y clásicos, así como servicios
							completos de barba para que siempre luzcas impecable.
						</p>
						<p>
							¡Relájate, siéntete como en casa y déjanos cuidar de tu imagen!
						</p>
					</div>
					<span className="flex justify-center mt-10">
						<Link
							to="/reservations"
							className="text-white bg-shark-500 text-lg font-semibold p-2 rounded-lg hover:bg-shark-600 transition-all"
						>
							Reserva tu turno
						</Link>
					</span>
				</div>
				<div className="w-full md:w-1/2 ">
					<Slider {...settings}>
						{images.map((src, index) => (
							<div key={src}>
								<img
									src={src}
									alt={`Slide ${src}`}
									className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-xl shadow-md"
									loading={index === 0 ? "eager" : "lazy"}
      								fetchPriority={index === 0 ? "high" : "auto"}
								/>
							</div>
						))}
					</Slider>
				</div>
			</section>
			<section className="mt-20 md:pt-15 flex flex-col lg:flex-row items-center justify-center gap-8">
				<div className="max-w-[35rem] font-chivo">
					<p className="text-4xl md:text-5xl font-bold tracking-tight text-shark-600 mb-10 text-center">
						📍Donde encontrarnos
					</p>
					<div className="text-2xl font-medium text-shark-300 space-y-1 text-center">
						<p>
							AF Peluquería está ubicada en Benvenuto 1431, Leones, Córdoba.
						</p>
						<p>
							Te invitamos a visitarnos y disfrutar de un ambiente cómodo,
							atención personalizada y el mejor servicio en cortes de pelo y
							barba.
						</p>
					</div>
				</div>
				<div className="w-full md:w-[70%] mb-5">
					<MapIframe />
				</div>
			</section>
		</main>
	);
};

export default Home;
