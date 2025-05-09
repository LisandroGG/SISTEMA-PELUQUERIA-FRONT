export const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
export const phoneRegex = /^\+?\d{10,15}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
export const costRegex = /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/;
export const serviceNameRegex = /^[a-zA-Z0-9\s\-\(\)]+$/;
export const durationRegex = /^[1-9][0-9]*$/;
export const nameRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;

export const validatePassword = (password) => {
	if (!passwordRegex.test(password)) {
		return "La contraseña debe tener entre 8 y 20 caracteres, incluir mayúsculas, minúsculas, un número y un símbolo.";
	}
	return "";
};

export const validatePhone = (phoneNumber) => {
	if (!phoneRegex.test(phoneNumber)) {
		return "Número de teléfono inválido. Debe contener entre 10 y 15 dígitos.";
	}
	return "";
};

export const validateGmail = (Gmail) => {
	if (!emailRegex.test(Gmail)) {
		return "Solo se permiten correos de Gmail válidos.";
	}
	return "";
};

export const validateCost = (cost) => {
	if (!costRegex.test(cost)) {
		return "Ingrese un costo válido para el servicio, debe ser mayor a 0.";
	}
	return "";
};

export const validateServiceName = (serviceName) => {
	if (!serviceNameRegex.test(serviceName)) {
		return "Ingrese un nombre válido para el servicio, se permite - y ().";
	}
	return "";
};

export const validateDuration = (duration) => {
	if (!durationRegex.test(duration)) {
		return "La duración debe ser un número entero mayor que 0.";
	}
	return "";
};

export const validateName = (name) => {
	if (!nameRegex.test(name)) {
		return "El nombre solo puede contener letras y espacios.";
	}
	return "";
};
