import axios from "axios";

import {
	getErrorMessage,
	jsonHeaders,
	startLoading,
	stopLoading,
} from "./actions-utils.js";

import {
	CANCEL_RESERVATION,
	CHANGE_PASSWORD,
	CHANGE_RESERVATION_STATUS,
	CREATE_CUSTOM_WORKING_HOURS,
	CREATE_DISABLE_DAY,
	CREATE_RESERVATION,
	CREATE_SERVICE,
	CREATE_WORKER,
	CREATE_WORKING_HOURS,
	DELETE_CUSTOM_WORKING_HOURS,
	DELETE_DISABLE_DAY,
	DELETE_SERVICE,
	DELETE_WORKER,
	DELETE_WORKING_HOURS,
	EDIT_CUSTOM_WORKING_HOURS,
	EDIT_SERVICE,
	EDIT_WORKER,
	EDIT_WORKING_HOURS,
	FORGOT_PASSWORD,
	GET_ALL_RESERVATIONS,
	GET_ALL_WORKERS,
	GET_BLOQUED_DAYS,
	GET_CUSTOM_WORKING_HOURS_BY_WORKER,
	GET_DISABLE_DAYS,
	GET_RESERVATIONS_BY_GMAIL,
	GET_SERVICES,
	GET_WORKER_BY_SERVICE,
	GET_WORKING_HOURS_BY_DATE,
	GET_WORKING_HOURS_BY_WORKER,
	LOGIN,
	LOGOUT,
	REGISTER,
	SET_LOADING_BLOQUED_DAYS,
	SET_LOADING_CUSTOM_WORKING_HOURS,
	SET_LOADING_DISABLE_DAYS,
	SET_LOADING_RESERVATIONS,
	SET_LOADING_SERVICES,
	SET_LOADING_SESSION,
	SET_LOADING_WORKERS,
	SET_LOADING_WORKING_HOURS,
	SET_LOADING_WORKING_HOURS_BY_DATE,
} from "./actions-types";

const LOCAL = import.meta.env.VITE_LOCAL;
const DEPLOY = import.meta.env.VITE_DEPLOY;

//------------------------------------------------USER ACTIONS-----------------------------------------------------------------------------//
export const registerUser = (formData) => {
	return async (dispatch) => {
		console.log("ejecutamos register");
		try {
			const { data } = await axios.post(
				`${LOCAL}/users/register`,
				formData,
				jsonHeaders,
			);
			console.log(data);
			dispatch({
				type: REGISTER,
				payload: data,
			});

			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const loginUser = (formData) => {
	return async (dispatch) => {
		console.log("ejecutamos login");
		try {
			const { data } = await axios.post(
				`${LOCAL}/users/login`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: LOGIN,
				payload: data.user,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const logoutUser = () => {
	return async (dispatch) => {
		console.log("ejecutamos logout");
		try {
			const { data } = await axios.post(
				`${LOCAL}/users/logout`,
				{},
				{
					withCredentials: true,
				},
			);

			dispatch({
				type: LOGOUT,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const refreshToken = async () => {
	try {
		const res = await axios.post(
			`${LOCAL}/users/refresh`,
			{},
			{
				withCredentials: true,
			},
		);
		return res.data.token;
	} catch (error) {
		console.error("Error al refrescar token", error);
		return null;
	}
};

export const getUserSession = () => {
	return async (dispatch) => {
		console.log("Se ejecuto getUserSession");
		startLoading(dispatch, SET_LOADING_SESSION);
		try {
			const { data } = await axios.get(`${LOCAL}/users/me`, {
				withCredentials: true,
			});

			dispatch({
				type: LOGIN,
				payload: data.user,
			});
		} catch (error) {
			if (error.response?.status === 401) {
				const newAccessToken = await refreshToken();
				if (newAccessToken) {
					try {
						const { data: userData } = await axios.get(`${LOCAL}/users/me`, {
							headers: {
								Authorization: `Bearer ${newAccessToken}`,
							},
							withCredentials: true,
						});
						dispatch({
							type: "LOGIN",
							payload: userData.user,
						});
					} catch (error) {
						stopLoading(dispatch, SET_LOADING_SESSION);
					}
				} else {
					stopLoading(dispatch, SET_LOADING_SESSION);
				}
			} else {
				stopLoading(dispatch, SET_LOADING_SESSION);
			}
		}
	};
};

export const forgotPassword = (formData) => {
	return async (dispatch) => {
		console.log("ejecutamos forgotpassword");
		try {
			const { data } = await axios.post(
				`${LOCAL}/users/forgotPassword`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: FORGOT_PASSWORD,
				payload: data,
			});

			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const changePassword = (token, formData) => {
	return async (dispatch) => {
		console.log("ejecutamos changepassword");
		try {
			const { data } = await axios.put(
				`${LOCAL}/users/changePassword?token=${token}`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: CHANGE_PASSWORD,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

//------------------------------------------------USER ACTIONS-----------------------------------------------------------------------------//

//------------------------------------------------SERVICES ACTIONS-------------------------------------------------------------------------//

export const getServices = () => {
	return async (dispatch) => {
		console.log("se ejecuto getServices");
		startLoading(dispatch, SET_LOADING_SERVICES);
		try {
			const { data } = await axios.get(`${LOCAL}/services`, {
				withCredentials: true,
			});
			dispatch({
				type: GET_SERVICES,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			stopLoading(dispatch, SET_LOADING_SERVICES);
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const createService = (formData) => {
	return async (dispatch) => {
		console.log("ejecutamos createService");
		try {
			const { data } = await axios.post(
				`${LOCAL}/services/create`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: CREATE_SERVICE,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const deleteService = (serviceId) => {
	return async (dispatch) => {
		console.log("ejecutamos deleteService");
		try {
			const { data } = await axios.delete(
				`${LOCAL}/services/delete/${serviceId}`,
				{
					withCredentials: true,
				},
			);
			dispatch({
				type: DELETE_SERVICE,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const editService = (formData, serviceId) => {
	return async (dispatch) => {
		console.log("ejecutamos editService");
		try {
			const { data } = await axios.put(
				`${LOCAL}/services/edit/${serviceId}`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: EDIT_SERVICE,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

//------------------------------------------------SERVICES ACTIONS-------------------------------------------------------------------------//

//------------------------------------------------RESERVATIONS ACTIONS---------------------------------------------------------------------//

export const getAllReservations = (filters = {}) => {
	return async (dispatch) => {
		console.log("ejecutamos getAllReservations");
		startLoading(dispatch, SET_LOADING_RESERVATIONS);
		try {
			const queryParams = new URLSearchParams(filters).toString();
			const { data } = await axios.get(`${LOCAL}/reservations?${queryParams}`, {
				withCredentials: true,
			});
			dispatch({
				type: GET_ALL_RESERVATIONS,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			stopLoading(dispatch, SET_LOADING_RESERVATIONS);
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const getReservationsByGmail = (gmail) => {
	return async (dispatch) => {
		console.log("ejecutamos getReservationsByGmail");
		startLoading(dispatch, SET_LOADING_RESERVATIONS);
		try {
			const { data } = await axios.get(
				`${LOCAL}/reservations/by-gmail?gmail=${gmail}`,
				{
					withCredentials: true,
				},
			);
			dispatch({
				type: GET_RESERVATIONS_BY_GMAIL,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			stopLoading(dispatch, SET_LOADING_RESERVATIONS);
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const createReservation = (formData) => {
	return async (dispatch) => {
		console.log("ejecutamos createReservation");
		try {
			const { data } = await axios.post(
				`${LOCAL}/reservations/create`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: CREATE_RESERVATION,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const changeReservationStatus = (reservationId) => {
	return async (dispatch) => {
		console.log("ejecutamos changeReservationStatus");
		try {
			const { data } = await axios.put(
				`${LOCAL}/reservations/${reservationId}/finish`,
				{
					withCredentials: true,
				},
			);
			dispatch({
				type: CHANGE_RESERVATION_STATUS,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const cancelReservation = (token) => {
	return async (dispatch) => {
		console.log("ejecutamos cancelReservation");
		try {
			const { data } = await axios.put(
				`${LOCAL}/reservations/cancel?token=${token}`,
				{
					withCredentials: true,
				},
			);
			dispatch({
				type: CANCEL_RESERVATION,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

//------------------------------------------------RESERVATIONS ACTIONS---------------------------------------------------------------------//

//------------------------------------------------WORKERS ACTIONS--------------------------------------------------------------------------//

export const getAllWorkers = () => {
	return async (dispatch) => {
		console.log("ejecutamos getAllWorkers");
		startLoading(dispatch, SET_LOADING_WORKERS);
		try {
			const { data } = await axios.get(`${LOCAL}/workers`, {
				withCredentials: true,
			});
			dispatch({
				type: GET_ALL_WORKERS,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			stopLoading(dispatch, SET_LOADING_WORKERS);
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const getWorkersByService = (serviceId) => {
	return async (dispatch) => {
		console.log("ejecutamos getWorkersByServices");
		startLoading(dispatch, SET_LOADING_WORKERS);
		try {
			const { data } = await axios.get(`${LOCAL}/workers/${serviceId}`, {
				withCredentials: true,
			});
			dispatch({
				type: GET_WORKER_BY_SERVICE,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			stopLoading(dispatch, SET_LOADING_WORKERS);
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const createWorker = (formData) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				`${LOCAL}/workers/create`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: CREATE_WORKER,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const editWorker = (formData, workerId) => {
	return async (dispatch) => {
		console.log("ejecutamos editWorker");
		try {
			const { data } = await axios.put(
				`${LOCAL}/workers/edit/${workerId}`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: EDIT_WORKER,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const deleteWorker = (workerId) => {
	return async (dispatch) => {
		console.log("ejecutamos deleteWorker");
		try {
			const { data } = await axios.delete(
				`${LOCAL}/workers/delete/${workerId}`,
				{
					withCredentials: true,
				},
			);
			dispatch({
				type: DELETE_WORKER,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

//------------------------------------------------WORKERS ACTIONS--------------------------------------------------------------------------//

//------------------------------------------------DISABLE DATES ACTIONS--------------------------------------------------------------------//

export const getDisableDays = (id) => {
	return async (dispatch) => {
		console.log("ejecutamos getDisableDays");
		startLoading(dispatch, SET_LOADING_DISABLE_DAYS);
		try {
			const { data } = await axios.get(`${LOCAL}/disableDay?workerId=${id}`, {
				withCredentials: true,
			});
			dispatch({
				type: GET_DISABLE_DAYS,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			stopLoading(dispatch, SET_LOADING_DISABLE_DAYS);
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const createDisableDay = (disableDayData) => {
	return async (dispatch) => {
		console.log("ejecutamos createDisableDay");
		try {
			const { data } = await axios.post(
				`${LOCAL}/disableDay/create`,
				disableDayData,
				jsonHeaders,
			);
			dispatch({
				type: CREATE_DISABLE_DAY,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const deleteDisableDay = (id) => {
	return async (dispatch) => {
		console.log("ejecutamos cancelDisableDay");
		try {
			const { data } = await axios.delete(`${LOCAL}/disableDay/delete/${id}`, {
				withCredentials: true,
			});
			dispatch({
				type: DELETE_DISABLE_DAY,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

//------------------------------------------------DISABLE DATES ACTIONS--------------------------------------------------------------------//

//------------------------------------------------CALENDARS ACTIONS------------------------------------------------------------------------//

export const getWorkingHoursByWorker = (workerId, date, serviceId) => {
	return async (dispatch) => {
		console.log("ejecutamos getWorkingHoursByWorker");
		startLoading(dispatch, SET_LOADING_WORKING_HOURS_BY_DATE);
		try {
			const { data } = await axios.get(
				`${LOCAL}/hours/by-date?workerId=${workerId}&date=${date}&serviceId=${serviceId}`,
				{
					withCredentials: true,
				},
			);
			dispatch({
				type: GET_WORKING_HOURS_BY_DATE,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			stopLoading(dispatch, SET_LOADING_WORKING_HOURS_BY_DATE);
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const getBloquedDays = (workerId, serviceId) => {
	return async (dispatch) => {
		console.log("ejecutamos getBloquedDays");
		startLoading(dispatch, SET_LOADING_BLOQUED_DAYS);
		try {
			const { data } = await axios.get(
				`${LOCAL}/hours/bloquedDays?workerId=${workerId}&serviceId=${serviceId}`,
				{
					withCredentials: true,
				},
			);
			dispatch({
				type: GET_BLOQUED_DAYS,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			stopLoading(dispatch, SET_LOADING_BLOQUED_DAYS);
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

//------------------------------------------------CALENDARS ACTIONS------------------------------------------------------------------------//

//------------------------------------------------WORKING HOURS ACTIONS--------------------------------------------------------------------//

export const getWorkingHours = (workerId) => {
	return async (dispatch) => {
		console.log("ejecutamos getWorkingHours");
		startLoading(dispatch, SET_LOADING_WORKING_HOURS);
		try {
			const { data } = await axios.get(
				`${LOCAL}/hours/working?workerId=${workerId}`,
				{
					withCredentials: true,
				},
			);
			dispatch({
				type: GET_WORKING_HOURS_BY_WORKER,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			stopLoading(dispatch, SET_LOADING_WORKING_HOURS);
			dispatch({
				type: GET_WORKING_HOURS_BY_WORKER,
				payload: [],
			});
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const createWorkingHour = (formData) => {
	return async (dispatch) => {
		console.log("ejecutamos createWorkingHour");
		try {
			const { data } = await axios.post(
				`${LOCAL}/hours/working/create`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: CREATE_WORKING_HOURS,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const editWorkingHours = (formData, id) => {
	return async (dispatch) => {
		console.log("ejecutamos editWorkingHours");
		try {
			const { data } = await axios.put(
				`${LOCAL}/hours/working/edit/${id}`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: EDIT_WORKING_HOURS,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const deleteWorkingHour = (id) => {
	return async (dispatch) => {
		console.log("ejecutamos deleteWorkingHour");
		try {
			const { data } = await axios.delete(
				`${LOCAL}/hours/working/delete/${id}`,
				{
					withCredentials: true,
				},
			);
			dispatch({
				type: DELETE_WORKING_HOURS,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

//------------------------------------------------WORKING HOURS ACTIONS--------------------------------------------------------------------//

//------------------------------------------------CUSTOM WORKING HOURS ACTIONS-------------------------------------------------------------//

export const getCustomWorkingHours = (workerId) => {
	return async (dispatch) => {
		console.log("ejecutamos getCustomWorkingHours");
		startLoading(dispatch, SET_LOADING_CUSTOM_WORKING_HOURS);
		try {
			const { data } = await axios.get(
				`${LOCAL}/hours/custom?workerId=${workerId}`,
				{
					withCredentials: true,
				},
			);
			dispatch({
				type: GET_CUSTOM_WORKING_HOURS_BY_WORKER,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			stopLoading(dispatch, SET_LOADING_CUSTOM_WORKING_HOURS);
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const createCustomWorkingHour = (formData) => {
	return async (dispatch) => {
		console.log("ejecutamos createCustomWorkingHour");
		try {
			const { data } = await axios.post(
				`${LOCAL}/hours/custom/create`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: CREATE_CUSTOM_WORKING_HOURS,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const editCustomWorkingHour = (formData, id) => {
	return async (dispatch) => {
		console.log("ejecutamos editCustomWorkingHour");
		try {
			const { data } = await axios.put(
				`${LOCAL}/hours/custom/edit/${id}`,
				formData,
				jsonHeaders,
			);
			dispatch({
				type: EDIT_CUSTOM_WORKING_HOURS,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

export const deleteCustomWorkingHour = (id) => {
	return async (dispatch) => {
		console.log("ejecutamos deleteCustomWorkingHour");
		try {
			const { data } = await axios.delete(
				`${LOCAL}/hours/custom/delete/${id}`,
				{
					withCredentials: true,
				},
			);
			dispatch({
				type: DELETE_CUSTOM_WORKING_HOURS,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			return { success: false, message: getErrorMessage(error) };
		}
	};
};

//------------------------------------------------CUSTOM WORKING HOURS ACTIONS-------------------------------------------------------------//
