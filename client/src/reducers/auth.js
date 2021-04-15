// import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, USER_LOADED} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null
};

function auth(state = initialState, action) {
	const {payload, type} = action;

	switch (type) {
		default:
			return state;
	}
}

export default auth;
