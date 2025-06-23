import { useKeenSlider } from "keen-slider/react";
import React from "react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import MapIframe from "@/Map/Map";
import { AutoplayPlugin } from "@/Utils/Autoloop.js";

const Home = () => {
	const [sliderRef] = useKeenSlider(
		{
			loop: true,
			slides: { perView: 1 },
			autoplay: { delay: 3000 },
		},
		[AutoplayPlugin],
	);

	const images = [
		{
			src: "assets/foto1.webp",
			src480: "assets/foto1-480w.webp",
			src768: "assets/foto1-768.webp",
		},
		{
			src: "assets/foto2.webp",
			src480: "assets/foto2-480w.webp",
			src768: "assets/foto2-768.webp",
		},
		{
			src: "assets/foto3.webp",
			src480: "assets/foto3-480w.webp",
			src768: "assets/foto3-768.webp",
		},
		{
			src: "assets/foto4.webp",
			src480: "assets/foto4-480w.webp",
			src768: "assets/foto4-768.webp",
		},
		{
			src: "assets/foto5.webp",
			src480: "assets/foto5-480w.webp",
			src768: "assets/foto5-768.webp",
		},
		{
			src: "assets/foto6.webp",
			src480: "assets/foto6-480w.webp",
			src768: "assets/foto6-768.webp",
		},
		{
			src: "assets/foto7.webp",
			src480: "assets/foto7-480w.webp",
			src768: "assets/foto7-768.webp",
		},
		{
			src: "assets/foto8.webp",
			src480: "assets/foto8-480w.webp",
			src768: "assets/foto8-768.webp",
		},
		{
			src: "assets/foto9.webp",
			src480: "assets/foto9-480w.webp",
			src768: "assets/foto9-768.webp",
		},
	];

	return (
		<main className="max-w-7xl mx-auto mt-18 p-4 md:px-8 lg:px-4 px-5 mb-10">
			<section className="py-6 md:py-15 flex flex-col md:flex-row items-center justify-center text-center gap-8">
				<div className="max-w-[35rem] font-chivo">
					<p className="text-4xl md:text-5xl font-bold tracking-tight text-shark-600 mb-10">
						💈Bienvenidos a AF Peluquería
					</p>
					<div className="text-xl md:text-2xl font-medium text-shark-300 space-y-1">
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
							className="hover:scale-105 text-white bg-shark-500 text-lg font-semibold p-2 rounded-lg hover:bg-shark-600 transition-all"
						>
							Reserva tu turno
						</Link>
					</span>
				</div>

				<div className="w-full md:w-1/2">
					<div ref={sliderRef} className="keen-slider rounded-xl shadow-md">
						{images.map((image, index) => {
							const src = image.src;
							const src480 = image.src480;
							const src768 = image.src768;
							return (
								<div key={index} className="keen-slider__slide">
									<img
										src={src}
										srcSet={`${src480 || src} 480w, ${src768 || src} 768w, ${src} 1024w`}
										sizes="(max-width: 768px) 100vw, 50vw"
										alt={`Slide ${index + 1}`}
										loading={index === 0 ? "eager" : "lazy"}
										fetchPriority={index === 0 ? "high" : "auto"}
										className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-xl shadow-md"
									/>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			<section className="mt-20 md:pt-15 flex flex-col lg:flex-row items-center justify-center gap-8">
				<div className="max-w-[35rem] font-chivo">
					<p className="text-4xl md:text-5xl font-bold tracking-tight text-shark-600 mb-10 text-center">
						📍Donde encontrarnos
					</p>
					<div className="text-xl md:text-2xl font-medium text-shark-300 space-y-1 text-center">
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
