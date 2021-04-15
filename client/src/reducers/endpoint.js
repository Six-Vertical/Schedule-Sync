import {GET_ENDPOINTS_SUCCESS, GET_ENDPOINTS_FAIL, GET_ENDPOINT_SUCCESS, GET_ENDPOINT_FAIL, CLEAR_ENDPOINT, CLEAR_ENDPOINTS, UPDATE_ENDPOINT, DELETE_ENDPOINT, ENDPOINTS_ERROR, CREATE_ENDPOINT} from '../actions/types';

const inititalState = {
	endpoints: [],
	endpoint: null,
	loading: true,
	error: null
};

function endpoint(state = inititalState, action) {
	const {payload, type} = action;

	switch (type) {
		case GET_ENDPOINTS_SUCCESS:
			return {
				...state,
				loading: false,
				endpoints: payload
			};
		case GET_ENDPOINT_SUCCESS:
			return {
				...state,
				loading: false,
				endpoint: payload
			};
		case CREATE_ENDPOINT:
			return {
				...state,
				loading: false,
				endpoints: [...state.endpoints, payload]
			};
		case DELETE_ENDPOINT:
			return {
				...state,
				loading: false,
				endpoints: state.endpoints.filter((end) => end._id !== payload.id)
			};
		case CLEAR_ENDPOINTS:
			return {
				...state,
				endpoints: []
			};
		case CLEAR_ENDPOINT:
			return {
				...state,
				endpoint: null
			};
		case UPDATE_ENDPOINT:
			return {
				...state,
				loading: false,
				endpoint: payload
			};
		case GET_ENDPOINTS_FAIL:
		case GET_ENDPOINT_FAIL:
		case ENDPOINTS_ERROR:
			return {
				...state,
				loading: false,
				error: payload
			};
		default:
			return state;
	}
}

export default endpoint;
