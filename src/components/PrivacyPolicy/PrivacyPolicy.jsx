import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
	const navigate = useNavigate();

	return (
		<div className="bg-bgbody">
			<div className="max-w-3xl mx-auto px-6 py-16 text-shark-500">
				<h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">
						1. Información que recopilamos
					</h2>
					<p>
						Recopilamos tu número de teléfono y los datos necesarios para
						gestionar tus reservas de turnos, incluyendo nombre, fecha y hora
						del turno.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">
						2. Uso de la información
					</h2>
					<ul className="list-disc list-inside">
						<li>Confirmar reservas.</li>
						<li>Notificar cambios o cancelaciones.</li>
						<li>Enviar recordatorios de turno 1 hora antes.</li>
					</ul>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">
						3. Protección de la información
					</h2>
					<p>
						Tus datos se almacenan de forma segura y no serán compartidos con
						terceros, salvo que sea necesario para cumplir con el servicio que
						has solicitado (por ejemplo, servicios de mensajería).
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">
						4. Conservación de los datos
					</h2>
					<p>
						Los datos se conservarán durante el tiempo necesario para gestionar
						la reserva y cumplir con las obligaciones legales.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">
						5. Derechos de los usuarios
					</h2>
					<p>
						Puedes solicitar que eliminemos tus datos o que dejemos de enviarte
						notificaciones en cualquier momento contactándonos en{" "}
						<a
							href="mailto:peluqueriaaf4@gmail.com"
							className="text-shark-700 font-semibold underline"
						>
							peluqueriaaf4@gmail.com
						</a>
						.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-2">
						6. Cookies y tecnologías similares
					</h2>
					<p>
						Este sitio utiliza cookies para mejorar la experiencia del usuario.
						Puedes configurar tu navegador para rechazar las cookies si lo
						prefieres.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold mb-2">7. Contacto</h2>
					<p>
						Si tienes dudas sobre nuestra política de privacidad, contáctanos en{" "}
						<a
							href="mailto:peluqueriaaf4@gmail.com"
							className="text-shark-700 font-semibold underline"
						>
							peluqueriaaf4@gmail.com
						</a>{" "}
						o al WhatsApp{" "}
						<a
							href="https://wa.me/5493472438424"
							className="text-shark-700 font-semibold underline"
						>
							+54 9 3472 438424
						</a>
						.
					</p>
				</section>
				<div className="flex justify-center">
					<button
						type="button"
						onClick={() => navigate("/")}
						className="mt-8 px-4 py-3 bg-shark-500 font-chivo text-white text-md font-semibold rounded-lg hover:bg-shark-600 hover:cursor-pointer hover:scale-105 transition-all"
					>
						Volver al inicio
					</button>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
