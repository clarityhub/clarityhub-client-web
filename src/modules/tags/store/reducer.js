import { combineReducers } from 'redux';

import tags from './tagReducer';
import tagItems from './tagItemReducer';

export default combineReducers({
	tags,
	tagItems,
});
