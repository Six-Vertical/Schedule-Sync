import {GET_ENDPOINTS_SUCCESS, GET_ENDPOINTS_FAIL, GET_ENDPOINT_SUCCESS, GET_ENDPOINT_FAIL, CLEAR_ENDPOINT, CLEAR_ENDPOINTS, CREATE_ENDPOINT, UPDATE_ENDPOINT, DELETE_ENDPOINT, ENDPOINTS_ERROR} from './types';
import axios from 'axios';

export const getEndpoints = () => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/ma/endpoints`);
		console.log({endpoints: res.data.endpoints});

		dispatch({
			type: GET_ENDPOINTS_SUCCESS,
			payload: res.data.endpoints
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: GET_ENDPOINTS_FAIL,
			payload: err.response
		});
	}
};

export const getEndpoint = (endId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/ma/endpoints/${endId}`);
		console.log({endpoint: res.data.endpoint});

		dispatch({
			type: GET_ENDPOINT_SUCCESS,
			payload: res.data.endpoint
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: GET_ENDPOINT_FAIL,
			payload: err.response
		});
	}
};

export const createEndpoint = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		const res = await axios.post(`/api/v1/ma/endpoints`, formData, config);
		console.log({newEndpoint: res.data.endpoint});

		dispatch({
			type: CREATE_ENDPOINT,
			payload: res.data.endpoint
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: ENDPOINTS_ERROR,
			payload: err.response
		});
	}
};

export const updateEndpoint = (endId, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.put(`/api/v1/ma/endpoints/${endId}`, formData, config);
		console.log({updatedEndpoint: res.data.endpoint});

		dispatch({
			type: UPDATE_ENDPOINT,
			payload: res.data.endpoint
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: ENDPOINTS_ERROR,
			payload: err.response
		});
	}
};

export const deleteEndpoint = (endId) => async (dispatch) => {
	if (window.confirm('Are you sure you want to delete this endpoint? All associated Appointment-Type Mappings and Calendar Mappings will be deleted.')) {
		try {
			const res = await axios.delete(`/api/v1/ma/endpoints/${endId}`);
			console.log({delete: res.data});

			dispatch({
				type: DELETE_ENDPOINT,
				payload: {id: endId, endpoint: res.data.endpoint}
			});
		} catch (err) {
			console.error(err);
			dispatch({
				type: ENDPOINTS_ERROR,
				payload: err.response
			});
		}
	}
};

export const clearEndpoints = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ENDPOINTS
	});
};

export const clearEndpoint = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ENDPOINT
	});
};
