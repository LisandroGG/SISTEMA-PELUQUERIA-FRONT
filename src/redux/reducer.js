import { REGISTER, LOGIN, LOGOUT, FORGOT_PASSWORD, CHANGE_PASSWORD, SET_LOADING_SESSION } from "./actions-types";

export const initialState = {
	user: null,
	isLoadingSession: true,
};

// biome-ignore lint: REDUCER
function rootReducer(state = initialState, action) {
	switch(action.type) {
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
		case SET_LOADING_SESSION:
			return {
				...state,
				isLoadingSession: action.payload,
			};
		case FORGOT_PASSWORD:
			return {
				...state,
			};
		case CHANGE_PASSWORD:
			return {
				...state,
			};
		default:
			return state;
	}
}

export default rootReducer;