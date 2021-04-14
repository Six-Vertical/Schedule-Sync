import {GET_CALENDARS_SUCCESS, GET_CALENDARS_FAIL, GET_CALENDAR_SUCCESS, GET_CALENDAR_FAIL, UPDATE_CALENDAR, CREATE_CALENDAR, DELETE_CALENDAR, CLEAR_CALENDAR, CLEAR_CALENDARS, CALENDARS_ERROR} from './types';
import axios from 'axios';

export const getCalendars = () => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/ma/calendars`);
		console.log({getCalendars: res.data.calendars});

		dispatch({
			type: GET_CALENDARS_SUCCESS,
			payload: res.data.calendars
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: GET_CALENDARS_FAIL,
			payload: err.response
		});
	}
};

export const getCalendar = (calId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/ma/calendars/${calId}`);

		dispatch({
			type: GET_CALENDAR_SUCCESS,
			payload: res.data.calendar
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: GET_CALENDAR_FAIL,
			payload: err.response
		});
	}
};

export const createCalendar = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.post(`/api/v1/ma/calendars`, formData, config);

		dispatch({
			type: CREATE_CALENDAR,
			payload: res.data.calendar
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: CALENDARS_ERROR,
			payload: err.response
		});
	}
};

export const updateCalendar = (calId, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.put(`/api/v1/ma/calendars/${calId}`, formData, config);

		dispatch({
			type: UPDATE_CALENDAR,
			payload: res.data.calendar
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: CALENDARS_ERROR,
			payload: err.response
		});
	}
};

export const deleteCalendar = (calId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/v1/ma/calendars/${calId}`);

		dispatch({
			type: DELETE_CALENDAR,
			payload: {id: calId, data: res.data.data}
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: CALENDARS_ERROR,
			payload: err.response
		});
	}
};

export const clearCalendar = () => async (dispatch) => {
	dispatch({
		type: CLEAR_CALENDAR
	});
};

export const clearCalendars = () => async (dispatch) => {
	dispatch({
		type: CLEAR_CALENDARS
	});
};
