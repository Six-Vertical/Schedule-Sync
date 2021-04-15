import {GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_FAIL, GET_ACCOUNT_SUCCESS, GET_ACCOUNT_FAIL, CLEAR_ACCOUNT, CREATE_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT, ACCOUNTS_ERROR, CLEAR_ACCOUNTS} from '../actions/types';

const initialState = {
	accounts: [],
	account: null,
	loading: true,
	error: null
};

function account(state = initialState, action) {
	const {type, payload} = action;

	switch (type) {
		case GET_ACCOUNTS_SUCCESS:
			return {
				...state,
				loading: false,
				accounts: payload
			};
		case GET_ACCOUNT_SUCCESS:
			return {
				...state,
				loading: false,
				account: payload
			};
		case CREATE_ACCOUNT:
			return {
				...state,
				loading: false,
				accounts: [...state.accounts, payload]
			};
		case CLEAR_ACCOUNT:
			return {
				...state,
				account: null
			};
		case CLEAR_ACCOUNTS:
			return {
				...state,
				accounts: []
			};
		case UPDATE_ACCOUNT:
			return {
				...state,
				loading: false,
				account: payload
			};
		case DELETE_ACCOUNT:
			return {
				...state,
				loading: false,
				accounts: state.accounts.filter((acc) => acc._id !== payload.id)
			};
		case ACCOUNTS_ERROR:
		case GET_ACCOUNTS_FAIL:
		case GET_ACCOUNT_FAIL:
			return {
				...state,
				loading: false,
				error: payload
			};
		default:
			return state;
	}
}

export default account;
