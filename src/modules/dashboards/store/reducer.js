import {
	GET_ALL_RECENT_ACTIVITY_LOADING,
	GET_ALL_RECENT_ACTIVITY_SUCCESS,
	GET_ALL_RECENT_ACTIVITY_FAILURE,
} from './constants';

export default (state = {
	items: [],
	hasLoadedAll: false,
	isReady: false,
	error: false,
}, action = {}) => {
	switch (action.type) {
	case GET_ALL_RECENT_ACTIVITY_LOADING:
		return {
			...state,
			isReady: false,
			error: false,
			hasLoadedAll: false,
		};
	case GET_ALL_RECENT_ACTIVITY_SUCCESS:
		return {
			...state,
			isReady: true,
			error: false,
			items: action.items.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()),
			hasLoadedAll: true,
		};
	case GET_ALL_RECENT_ACTIVITY_FAILURE:
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
