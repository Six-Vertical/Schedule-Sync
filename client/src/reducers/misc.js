import {MISC_ERROR, MISC_APPT_TYPES, MISC_GET_CALENDARS, MISC_CLEAR_ALL, MISC_LOADING} from '../actions/types';

const inititalState = {
	account1: null,
	account2: null,
	endpoint1: null,
	endpoint2: null,
	appointmentTypes: [],
	calendars: [],
	error: null,
	loading: true
};

export default function (state = inititalState, action) {
	const {payload, type} = action;

	switch (type) {
		case MISC_APPT_TYPES:
			return {
				...state,
				loading: false,
				appointmentTypes: payload
			};
		case MISC_LOADING:
			return {
				...state,
				loading: false
			};
		case MISC_GET_CALENDARS:
			return {
				...state,
				calendars: payload,
				loading: false
			};
		case MISC_CLEAR_ALL:
			return {
				...state,
				account1: null,
				account2: null,
				endpoint1: null,
				endpoint2: null,
				appointmentTypes: [],
				calendars: []
			};
		case MISC_ERROR:
			return {
				...state,
				error: payload
			};
		default:
			return state;
	}
}
