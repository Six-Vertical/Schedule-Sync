import {combineReducers} from 'redux';
// import auth from './auth';
// import alert from './alert';
import account from './account';
import endpoint from './endpoint';
import mapping from './mapping';
import misc from './misc';
import calendar from './calendar';

export default combineReducers({
	// auth,
	// alert,
	account,
	endpoint,
	mapping,
	misc,
	calendar
});
