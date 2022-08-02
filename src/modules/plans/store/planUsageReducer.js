import {
	USAGE_GET_ALL_LOADING,
	USAGE_GET_ALL_SUCCESS,
	USAGE_GET_ALL_FAILURE,
} from './constants';

export default (state = {
	usage: {},
	plans: {},
	hasLoadedAll: false,
	isReady: false,
	error: false,
}, action = {}) => {
	switch (action.type) {
	case USAGE_GET_ALL_LOADING:
		return {
			...state,
			isReady: false,
			error: false,
			hasLoadedAll: false,
		};
	case USAGE_GET_ALL_SUCCESS:
		return {
			...state,
			isReady: true,
			error: false,
			usage: action.items.usage,
			plans: action.items.planLimits,
			hasLoadedAll: true,
		};
	case USAGE_GET_ALL_FAILURE:
		return {
			...state,
			isReady: false,
			error: action.error,
			hasLoadedAll: false,
		};
	default:
		return state;
	}
};
