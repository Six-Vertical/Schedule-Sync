import {GET_MAPPINGS_SUCCESS, GET_MAPPINGS_FAIL, GET_MAPPING_SUCCESS, GET_MAPPING_FAIL, CLEAR_MAPPINGS, CLEAR_MAPPING, UPDATE_MAPPING, CREATE_MAPPING, DELETE_MAPPING, MAPPINGS_ERROR} from '../actions/types';

const initialState = {
	mappings: [],
	mapping: null,
	loading: true,
	error: null
};

function mapping(state = initialState, action) {
	const {payload, type} = action;

	switch (type) {
		case GET_MAPPINGS_SUCCESS:
			console.log({inReducer: state.mappings});
			return {
				...state,
				loading: false,
				mappings: payload
			};
		case GET_MAPPING_SUCCESS:
			return {
				...state,
				loading: false,
				mapping: payload
			};
		case CREATE_MAPPING:
			return {
				...state,
				loading: false,
				mappings: [...state.mappings, payload]
			};
		case UPDATE_MAPPING:
			return {
				...state,
				loading: false,
				mapping: payload
			};
		case DELETE_MAPPING:
			return {
				...state,
				loading: false,
				mappings: state.mappings.filter((map) => map._id !== payload.id)
			};
		case CLEAR_MAPPINGS:
			return {
				...state,
				mappings: []
			};
		case CLEAR_MAPPING:
			return {
				...state,
				mapping: null
			};
		case MAPPINGS_ERROR:
		case GET_MAPPINGS_FAIL:
		case GET_MAPPING_FAIL:
			return {
				...state,
				error: payload,
				loading: false
			};
		default:
			return state;
	}
}

export default mapping;
