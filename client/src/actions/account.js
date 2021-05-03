import {GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_FAIL, GET_ACCOUNT_SUCCESS, GET_ACCOUNT_FAIL, CLEAR_ACCOUNT, CREATE_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT, ACCOUNTS_ERROR, CLEAR_ACCOUNTS} from './types';
import axios from 'axios';

export const getAccounts = () => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/ma/accounts`);

		console.log({getAccounts: res.data.accounts});

		dispatch({
			type: GET_ACCOUNTS_SUCCESS,
			payload: res.data.accounts
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: GET_ACCOUNTS_FAIL,
			payload: err.response
		});
	}
};

export const getAccount = (accId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/v1/ma/accounts/${accId}`);
		console.log({getAccount: res.data.account});

		dispatch({
			type: GET_ACCOUNT_SUCCESS,
			payload: res.data.account
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: GET_ACCOUNT_FAIL,
			payload: err.response
		});
	}
};

export const createAnAccount = (formData, edit = false) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post(`/api/v1/ma/accounts`, formData, config);
		console.log({create: res.data.account});

		dispatch({
			type: CREATE_ACCOUNT,
			payload: res.data.account
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: ACCOUNTS_ERROR,
			payload: err.response
		});
	}
};

export const updateAccount = (accId, formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.put(`/api/v1/ma/accounts/${accId}`, formData, config);

		console.log({update: res.data.account});
		dispatch({
			type: UPDATE_ACCOUNT,
			payload: res.data.account
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: ACCOUNTS_ERROR,
			payload: err.response
		});
	}
};

export const deleteAccount = (accId) => async (dispatch) => {
	if (window.confirm('Are you sure you want to delete this account? All associated Endpoints, Appointment-Type Mappings, and Calendar Mappings will be deleted.')) {
		try {
			const res = await axios.delete(`/api/v1/ma/accounts/${accId}`);
			console.log({delete: res.data.account});

			dispatch({
				type: DELETE_ACCOUNT,
				payload: {id: accId, data: res.data.account}
			});
		} catch (err) {
			console.error(err);
			dispatch({
				type: ACCOUNTS_ERROR,
				payload: err.response
			});
		}
	}
};

export const clearAccount = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ACCOUNT
	});
};

export const clearAccounts = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ACCOUNTS
	});
};
