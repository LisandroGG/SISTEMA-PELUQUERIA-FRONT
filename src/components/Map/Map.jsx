const MapIframe = () => {
	return (
		<div className="w-full h-84 lg:h-96 rounded-lg overflow-hidden shadow-lg">
			<iframe
				title="Ubication"
				src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d839.8284264389719!2d-62.30167981205401!3d-32.65109516228716!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cbd85d7564fb8b%3A0xc5f13a22830b19af!2sAF%20peluquer%C3%ADa!5e0!3m2!1ses!2sar!4v1748262730742!5m2!1ses!2sar"
				className="w-full h-full border-0 shadow-md"
				allowFullScreen=""
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			/>
		</div>
	);
};

export default MapIframe;
