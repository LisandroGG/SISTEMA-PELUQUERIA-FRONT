import {
	DELETE_DISABLE_DAY,
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
		//USERS
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
				workers: [],
				isLoadingWorkers: false,
				disableDays: [],
				isLoadingDisableDays: false,
				bloquedDays: [],
				isLoadingBloquedDays: false,
				workingHours: [],
				isLoadingWorkingHours: false,
				customWorkingHours: [],
				isLoadingCustomWorkingHours: false,
				workingHoursByDate: [],
				isLoadingWorkingHoursByDate: false,
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
		//SERVICES
		case GET_SERVICES:
			return {
				...state,
				services: action.payload,
				isLoadingServices: false,
			};
		case CREATE_SERVICE:
			return {
				...state,
				services: [...state.services, action.payload],
			};
		case DELETE_SERVICE:
			return {
				...state,
				services: state.services.filter(
					(service) => service.id !== action.payload.id,
				),
			};
		case EDIT_SERVICE:
			return {
				...state,
				services: state.services.map((service) =>
					service.id === action.payload.id ? action.payload.service : service,
				),
			};
		case SET_LOADING_SERVICES:
			return {
				...state,
				isLoadingServices: action.payload,
			};
		//RESERVATIONS
		case GET_ALL_RESERVATIONS:
			return {
				...state,
				reservations: action.payload,
				isLoadingReservations: false,
			};
		case GET_RESERVATIONS_BY_GMAIL:
			return {
				...state,
				reservations: action.payload,
				isLoadingReservations: false,
			};
		case GET_RESERVATIONS_BY_WORKER:
			return {
				...state,
				reservations: action.payload,
				isLoadingReservations: false,
			};
		case CREATE_RESERVATION:
			return {
				...state,
				reservations: [...state.reservations, action.payload],
			};
		case CHANGE_RESERVATION_STATUS:
			return {
				...state,
				reservations: state.reservations.map((res) =>
					res.id === action.payload.id ? action.payload : res,
				),
			};
		case CANCEL_RESERVATION:
			return {
				...state,
				reservations: state.reservations.map((res) =>
					res.id === action.payload.id ? action.payload : res,
				),
			};
		case SET_LOADING_RESERVATIONS:
			return {
				...state,
				isLoadingReservations: action.payload,
			};
		//WORKERS
		case GET_ALL_WORKERS:
			return {
				...state,
				workers: action.payload,
				isLoadingWorkers: false,
			};
		case GET_WORKER_BY_SERVICE:
			return {
				...state,
				workers: action.payload,
				isLoadingWorkers: false,
			};
		case CREATE_WORKER:
			return {
				...state,
				workers: [...state.workers, action.payload],
			};
		case EDIT_WORKER:
			return {
				...state,
				workers: state.workers.map((worker) =>
					worker.id === action.payload.id ? action.payload : worker,
				),
			};
		case DELETE_WORKER:
			return {
				...state,
				workers: state.workers.filter(
					(worker) => worker.id !== action.payload.id,
				),
			};
		case SET_LOADING_WORKERS:
			return {
				...state,
				isLoadingWorkers: action.payload,
			};
		//DISABLE DAYS
		case GET_DISABLE_DAYS:
			return {
				...state,
				disableDays: action.payload,
				isLoadingDisableDays: false,
			};
		case CREATE_DISABLE_DAY:
			return {
				...state,
				disableDays: [...state.disableDays, action.payload],
			};
		case DELETE_DISABLE_DAY:
			return {
				...state,
				disableDays: state.disableDays.filter(
					(day) => day.id !== action.payload.id,
				),
			};
		case SET_LOADING_DISABLE_DAYS:
			return {
				...state,
				isLoadingDisableDays: action.payload,
			};
		//WORKING HOURS BY DATE
		case GET_WORKING_HOURS_BY_DATE:
			return {
				...state,
				workingHoursByDate: action.payload,
				isLoadingWorkingHoursByDate: false,
			};
		case SET_LOADING_WORKING_HOURS_BY_DATE:
			return {
				...state,
				isLoadingWorkingHoursByDate: action.payload,
			};
		//BLOQUED DAYS
		case GET_BLOQUED_DAYS:
			return {
				...state,
				bloquedDays: action.payload,
				isLoadingBloquedDays: false,
			};
		case SET_LOADING_BLOQUED_DAYS:
			return {
				...state,
				isLoadingBloquedDays: action.payload,
			};
		//WORKING HOURS
		case GET_WORKING_HOURS_BY_WORKER:
			return {
				...state,
				workingHours: action.payload.workingHours || [],
				isLoadingWorkingHours: false,
			};
		case CREATE_WORKING_HOURS:
			return {
				...state,
				workingHours: [...state.workingHours, action.payload],
			};
		case EDIT_WORKING_HOURS:
			return {
				...state,
				workingHours: state.workingHours.map((hour) =>
					hour.id === action.payload.id ? action.payload : hour,
				),
			};
		case DELETE_WORKING_HOURS:
			return {
				...state,
				workingHours: state.workingHours.filter(
					(hour) => hour.id !== action.payload.id,
				),
			};
		case SET_LOADING_WORKING_HOURS:
			return {
				...state,
				isLoadingWorkingHours: action.payload,
			};
		//CUSTOM WORKING HOURS
		case GET_CUSTOM_WORKING_HOURS_BY_WORKER:
			return {
				...state,
				customWorkingHours: action.payload.customWorkingHours || [],
				isLoadingCustomWorkingHours: false,
			};
		case CREATE_CUSTOM_WORKING_HOURS:
			return {
				...state,
				customWorkingHours: [...state.customWorkingHours, action.payload],
			};
		case EDIT_CUSTOM_WORKING_HOURS:
			return {
				...state,
				customWorkingHours: state.customWorkingHours.map((hour) =>
					hour.id === action.payload.id ? action.payload : hour,
				),
			};
		case DELETE_CUSTOM_WORKING_HOURS:
			return {
				...state,
				customWorkingHours: state.customWorkingHours.filter(
					(hour) => hour.id !== action.payload.id,
				),
			};
		case SET_LOADING_CUSTOM_WORKING_HOURS:
			return {
				...state,
				isLoadingCustomWorkingHours: action.payload,
			};
		default:
			return state;
	}
}

export default rootReducer;
