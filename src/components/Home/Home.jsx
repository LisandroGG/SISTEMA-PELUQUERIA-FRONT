import React from "react";

const Home = () => {
	return (
		<main className="h-screen max-w-7xl mx-auto mt-18 p-4 md:px-8 lg:px-4">
			<section className="md:pt-40">
				<div className="max-w-[29rem]">
					<p className="text-6xl font-bold tracking-tight text-shark-600 mb-10">
						Bienvenidos a AF Peluquería!
					</p>
					<div className="text-2xl font-semibold text-shark-300">
						<p>Tu estilo es nuestra pasión.</p>
						<p>
							Ofrecemos cortes de pelo modernos y clásicos, así como servicios
							completos de barba para que siempre luzcas impecable.
						</p>
						<p>
							¡Relájate, siéntete como en casa y déjanos cuidar de tu imagen!
						</p>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Home;
