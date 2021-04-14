import {GET_CALENDARS_SUCCESS, GET_CALENDARS_FAIL, GET_CALENDAR_SUCCESS, GET_CALENDAR_FAIL, UPDATE_CALENDAR, CREATE_CALENDAR, DELETE_CALENDAR, CLEAR_CALENDAR, CLEAR_CALENDARS, CALENDARS_ERROR} from '../actions/types';

const initialState = {
	calendars: [],
	calendar: null,
	loading: true,
	error: null
};

export default function (state = initialState, action) {
	const {payload, type} = action;

	switch (type) {
		case GET_CALENDARS_SUCCESS:
			return {
				...state,
				loading: false,
				calendars: payload
			};
		case GET_CALENDAR_SUCCESS:
			return {
				...state,
				loading: false,
				calendar: payload
			};
		case CREATE_CALENDAR:
			return {
				...state,
				loading: false,
				calendars: [...state.calendars, payload]
			};
		case UPDATE_CALENDAR:
			return {
				...state,
				loading: false,
				calendar: payload
			};
		case DELETE_CALENDAR:
			return {
				...state,
				loading: false,
				calendars: state.calendars.filter((cal) => cal._id !== payload.id)
			};
		case CLEAR_CALENDARS:
			return {
				...state,
				calendars: []
			};
		case CLEAR_CALENDAR:
			return {
				...state,
				calendar: null
			};
		case GET_CALENDARS_FAIL:
		case GET_CALENDAR_FAIL:
		case CALENDARS_ERROR:
			return {
				...state,
				loading: false,
				error: payload
			};
		default:
			return state;
	}
}
