export const getErrorMessage = (error) =>
	error.response?.data.message ||
	error.message ||
	"Ocurrió un error inesperado";

export const jsonHeaders = {
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
};

export const stopLoading = (dispatch, type) => {
	dispatch({ type, payload: false });
};

export const startLoading = (dispatch, type) => {
	dispatch({ type, payload: true });
};
