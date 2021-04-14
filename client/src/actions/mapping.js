import {GET_MAPPINGS_SUCCESS, GET_MAPPINGS_FAIL, GET_MAPPING_SUCCESS, GET_MAPPING_FAIL, CLEAR_MAPPINGS, CLEAR_MAPPING, UPDATE_MAPPING, CREATE_MAPPING, DELETE_MAPPING, MAPPINGS_ERROR} from './types';
import axios from 'axios';

export const getMappings = () => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/ma/mapping`);
		console.log({getMappings: res.data.mappings});

		dispatch({
			type: GET_MAPPINGS_SUCCESS,
			payload: res.data.mappings
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: GET_MAPPINGS_FAIL,
			payload: err.response
		});
	}
};

export const getMapping = (mapId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/ma/mapping/${mapId}`);
		console.log({getMapping: res.data.mapping});

		dispatch({
			type: GET_MAPPING_SUCCESS,
			payload: res.data.mapping
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: GET_MAPPING_FAIL,
			payload: err.response
		});
	}
};

export const createMapping = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.post(`/api/v1/ma/mapping`, formData, config);
		console.log({createMapping: res.data.mapping});

		dispatch({
			type: CREATE_MAPPING,
			payload: res.data.mapping
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: MAPPINGS_ERROR,
			payload: err.response
		});
	}
};

export const updateMapping = (mapId, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.put(`/api/v1/ma/mapping/${mapId}`, formData, config);
		console.log({updateMapping: res.data.mapping});

		dispatch({
			type: UPDATE_MAPPING,
			payload: res.data.mapping
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: MAPPINGS_ERROR,
			payload: err.response
		});
	}
};

export const deleteMapping = (mapId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/v1/ma/mapping/${mapId}`);
		console.log({deleteMapping: res.data.mapping});

		dispatch({
			type: DELETE_MAPPING,
			payload: {id: mapId, mapping: res.data.data}
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: MAPPINGS_ERROR,
			payload: err.response
		});
	}
};

export const clearMappings = () => async (dispatch) => {
	dispatch({
		type: CLEAR_MAPPINGS
	});
};

export const clearMapping = () => async (dispatch) => {
	dispatch({
		type: CLEAR_MAPPING
	});
};
