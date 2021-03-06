import {SET_ALERT, CLEAR_ALERT} from '../actions/types';

const inititalState = [];

function alert(state = inititalState, action) {
	const {payload, type} = action;

	switch (type) {
		case SET_ALERT:
			return [...state, payload];
		case CLEAR_ALERT:
			return state.filter((al) => al.id !== payload);
		default:
			return state;
	}
}

export default alert;
