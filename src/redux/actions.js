import axios from "axios";

import {
	CHANGE_PASSWORD,
	FORGOT_PASSWORD,
	LOGIN,
	LOGOUT,
	REGISTER,
	SET_LOADING_SESSION,
} from "./actions-types";

const LOCAL = import.meta.env.VITE_LOCAL;
const DEPLOY = import.meta.env.VITE_DEPLOY;

//------------------------------------------------USER ACTIONS-----------------------------------------------------------------------------//
export const registerUser = (formData) => {
	return async (dispatch) => {
		console.log("ejecutamos register");
		try {
			const { data } = await axios.post(`${LOCAL}/users/register`, formData, {
				headers: { "Content-Type": "application/json" },
			});
			console.log(data);
			dispatch({
				type: REGISTER,
				payload: data,
			});

			return { success: true, message: data.message };
		} catch (error) {
			const errorMessage = error.response?.data.message || error.message;
			return { success: false, message: errorMessage };
		}
	};
};

export const loginUser = (formData) => {
	return async (dispatch) => {
		console.log("ejecutamos login");
		try {
			const { data } = await axios.post(`${LOCAL}/users/login`, formData, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
			console.log(data);
			dispatch({
				type: LOGIN,
				payload: data.user,
			});
			return { success: true, message: data.message };
		} catch (error) {
			const errorMessage = error.response?.data.message || error.message;
			return { success: false, message: errorMessage };
		}
	};
};

export const logoutUser = () => {
	return async (dispatch) => {
		console.log("ejecutamos logout");
		try {
			await axios.post(
				`${LOCAL}/users/logout`,
				{},
				{
					withCredentials: true,
				},
			);

			console.log("logout del usuario");
			return dispatch({
				type: LOGOUT,
			});
		} catch (error) {
			alert(error.message || "ERROR AL CERRAR SESION");
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
		dispatch({ type: SET_LOADING_SESSION, payload: true });
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
						dispatch({ type: SET_LOADING_SESSION, payload: false });
					}
				} else {
					dispatch({ type: SET_LOADING_SESSION, payload: false });
				}
			} else {
				dispatch({ type: SET_LOADING_SESSION, payload: false });
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
				{
					headers: { "Content-Type": "application/json" },
				},
			);
			dispatch({
				type: FORGOT_PASSWORD,
				payload: data,
			});

			return { success: true, message: data.message };
		} catch (error) {
			const errorMessage = error.response?.data.message || error.message;
			return { success: false, message: errorMessage };
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
				{
					headers: { "Content-Type": "application/json" },
				},
			);
			dispatch({
				type: CHANGE_PASSWORD,
				payload: data,
			});
			return { success: true, message: data.message };
		} catch (error) {
			const errorMessage = error.response?.data.message || error.message;
			return { success: false, message: errorMessage };
		}
	};
};

//------------------------------------------------USER ACTIONS-----------------------------------------------------------------------------//
