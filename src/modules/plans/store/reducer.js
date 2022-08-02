import { combineReducers } from 'redux';

import planUsage from './planUsageReducer';
import planItems from './planItemsReducer';

export default combineReducers({
	planUsage,
	items: planItems,
});
