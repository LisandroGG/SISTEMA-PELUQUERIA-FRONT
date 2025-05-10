import {
	CANCEL_RESERVATION,
	CANCEL_DISABLE_DAY,
	CHANGE_PASSWORD,
	CHANGE_RESERVATION_STATUS,
	CREATE_CUSTOM_WORKING_HOURS,
	CREATE_DISABLE_DAY,
	CREATE_RESERVATION,
	CREATE_SERVICE,
	CREATE_WORKER,
	CREATE_WORKING_HOURS,
	DELETE_CUSTOM_WORKING_HOURS,
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
	GET_RESERVATIONS_BY_WORKER,
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

export const initialState = {
	user: null,
	isLoadingSession: true,

	services: [],
	isLoadingServices: true,

	reservations: [],
	isLoadingReservations: true,

	workers: [],
	isLoadingWorkers: true,

	disableDays: [],
	isLoadingDisableDays: true,

	workingHoursByDate: [],
	isLoadingWorkingHoursByDate: true,

	bloquedDays: [],
	isLoadingBloquedDays: true,

	customWorkingHours: [],
	isLoadingCustomWorkingHours: true,

	workingHours: [],
	isLoadingWorkingHours: true,
};

// biome-ignore lint: REDUCER
function rootReducer(state = initialState, action) {
	switch (action.type) {
		case REGISTER:
			return {
				...state,
			};
		case LOGIN:
			return {
				...state,
				user: action.payload,
				isLoadingSession: false,
			};
		case LOGOUT:
			return {
				...state,
				user: null,
				isLoadingSession: false,
				services: [],
				isLoadingServices: false,
				reservations: [],
				isLoadingReservations: false,
			};
		case FORGOT_PASSWORD:
			return {
				...state,
			};
		case CHANGE_PASSWORD:
			return {
				...state,
			};
		case SET_LOADING_SESSION:
			return {
				...state,
				isLoadingSession: action.payload,
			};
		case GET_SERVICES: 
			return {
				...state,
				services: action.payload,
				isLoadingServices: false,
			}
		case CREATE_SERVICE: 
			return {
				...state,
				services: [...state.services, action.payload],
			}
		case DELETE_SERVICE:
			return {
				...state,
				services: state.services.filter(
					(service) => service.id !== action.payload.id
				),
			}
		case EDIT_SERVICE:
			return {
				...state,
				services: state.services.map((service) =>
					service.id === action.payload.id ? action.payload : service
				),
			};
		case SET_LOADING_SERVICES:
			return {
				...state,
				isLoadingServices: action.payload
			}
		default:
			return state;
	}
}

export default rootReducer;
