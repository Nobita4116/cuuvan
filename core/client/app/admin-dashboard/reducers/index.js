import { combineReducers } from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import users from './users';
import navigations from './navigations';

export default combineReducers({
	users,
	navigations,
	routing
});