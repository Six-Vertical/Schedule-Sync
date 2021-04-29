import {MISC_ERROR, MISC_APPT_TYPES, MISC_APPT_TYPES_2, MISC_GET_CALENDARS, MISC_GET_CALENDARS_2, MISC_CLEAR_ALL, MISC_LOADING} from '../actions/types';

const inititalState = {
	account1: null,
	account2: null,
	endpoint1: null,
	endpoint2: null,
	appointmentTypes: [],
	appointmentTypes2: [],
	calendars: [],
	calendars2: [],
	error: null,
	loading: true
};

function misc(state = inititalState, action) {
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
				loading: true
			};
		case MISC_GET_CALENDARS:
			return {
				...state,
				calendars: payload,
				loading: false
			};
		case MISC_GET_CALENDARS_2:
			return {
				...state,
				calendars2: payload,
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
				appointmentTypes2: [],
				calendars: [],
				calendars2: [],
				loading: true
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

export default misc;
