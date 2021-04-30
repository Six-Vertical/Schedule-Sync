import {MISC_APPT_TYPES, MISC_APPT_TYPES_2, MISC_CLEAR_APPT_TYPES_1, MISC_CLEAR_APPT_TYPES_2, MISC_CLEAR_CALENDAR_1, MISC_CLEAR_CALENDAR_2, MISC_LOADING, MISC_GET_CALENDARS, MISC_GET_CALENDARS_2, MISC_ERROR, MISC_CLEAR_ALL} from './types';
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

export const miscGetApptTypes2 = (userId, apiKey) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/acuity/appointment-types/${userId}/${apiKey}`);

		dispatch({
			type: MISC_APPT_TYPES_2,
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

export const miscGetCalendars2 = (userId, apiKey) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/acuity/calendars/${userId}/${apiKey}`);

		dispatch({
			type: MISC_GET_CALENDARS_2,
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

export const miscClearCalendar1 = () => async (dispatch) => {
	dispatch({
		type: MISC_CLEAR_CALENDAR_1
	});
};

export const miscClearCalendar2 = () => async (dispatch) => {
	dispatch({
		type: MISC_CLEAR_CALENDAR_2
	});
};

export const miscClearApptType1 = () => async (dispatch) => {
	dispatch({
		type: MISC_CLEAR_APPT_TYPES_1
	});
};

export const miscClearApptType2 = () => async (dispatch) => {
	dispatch({
		type: MISC_CLEAR_APPT_TYPES_2
	});
};
