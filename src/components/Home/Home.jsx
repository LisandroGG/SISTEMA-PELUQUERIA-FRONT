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
			src: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291540/foto1_p6j5md.webp",
			src480: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291539/foto1-480w_f6kdvz.webp",
			src768: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291540/foto1-768w_jvii63.webp",
		},
		{
			src: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291540/foto2_r9cj40.webp",
			src480: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291540/foto2-480w_cspefc.webp",
			src768: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291540/foto2-768_tli6rq.webp",
		},
		{
			src: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291540/foto3_lnn7uw.webp",
			src480: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291541/foto3-480w_tyw1wt.webp",
			src768: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291540/foto3-768w_m073uh.webp",
		},
		{
			src: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291540/foto4_uici9b.webp",
			src480: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291540/foto4-480w_ravl2f.webp",
			src768: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291541/foto4-768w_olquxq.webp",
		},
		{
			src: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291541/foto5_glolpp.webp",
			src480: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291541/foto5-480w_clqi5c.webp",
			src768: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291542/foto5-768w_c4au2y.webp",
		},
		{
			src: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291541/foto6_zsmhnz.webp",
			src480: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291541/foto6-480w_uihvht.webp",
			src768: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291541/foto6-768w_rjomvh.webp",
		},
		{
			src: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291542/foto7_yr3tdc.webp",
			src480: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291548/foto7-480w_gfwn4c.webp",
			src768: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291548/foto7-768w_kbtvks.webp",
		},
		{
			src: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291548/foto8_zrutkw.webp",
			src480: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291548/foto8-480w_wgvl22.webp",
			src768: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291548/foto8-768w_zfmfqg.webp",
		},
		{
			src: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291548/foto9_kx5d99.webp",
			src480: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291549/foto9-480w_yhkiat.webp",
			src768: "https://res.cloudinary.com/dcznyhsek/image/upload/v1753291548/foto9-768w_m6uaac.webp",
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
							className="animate-zoom text-white bg-shark-500 text-lg font-semibold p-2 rounded-lg hover:bg-shark-600 transition-all"
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
