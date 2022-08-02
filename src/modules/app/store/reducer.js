import { combineReducers } from 'redux';

import rightNav from './rightNavReducer';
import leftNav from './leftNavReducer';

export default combineReducers({
	rightNav,
	leftNav,
});
