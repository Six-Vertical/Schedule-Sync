import {MISC_APPT_TYPES, MISC_LOADING, MISC_GET_CALENDARS, MISC_ERROR, MISC_CLEAR_ALL} from './types';
import axios from 'axios';

export const miscGetApptTypes = (userId, apiKey) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/acuity/appointment-types/${userId}/${apiKey}`);

		dispatch({
			type: MISC_APPT_TYPES,
			payload: res.data.aptTypes
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: MISC_ERROR,
			payload: err.response
		});
	}
};

export const isLoading = () => async (dispatch) => {
	dispatch({
		type: MISC_LOADING
	});
};

export const miscGetCalendars = (userId, apiKey) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/acuity/calendars/${userId}/${apiKey}`);

		dispatch({
			type: MISC_GET_CALENDARS,
			payload: res.data.cals
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: MISC_ERROR,
			payload: err.response
		});
	}
};

export const miscClearAll = () => async (dispatch) => {
	dispatch({
		type: MISC_CLEAR_ALL
	});
};
