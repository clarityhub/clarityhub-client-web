import mergeItems from 'utilities/mergeItems';

import {
	GET_ALL_ONBOARDING_LOADING,
	GET_ALL_ONBOARDING_SUCCESS,
	GET_ALL_ONBOARDING_FAILURE,
	UPDATE_ONBOARDING_LOADING,
	UPDATE_ONBOARDING_SUCCESS,
	UPDATE_ONBOARDING_FAILURE,
	RESET_ERROR,
} from './constants';

export default (state = {
	items: [],
	hasLoadedAll: false,
	isReady: false,
	isCreating: false,
	isPatching: false,
	error: false,
}, action = {}) => {
	switch (action.type) {
	case GET_ALL_ONBOARDING_LOADING:
		return {
			...state,
			isReady: false,
			error: false,
			hasLoadedAll: false,
		};
	case GET_ALL_ONBOARDING_SUCCESS:
		return {
			...state,
			isReady: true,
			error: false,
			items: action.items,
			hasLoadedAll: true,
		};
	case GET_ALL_ONBOARDING_FAILURE:
		return {
			...state,
			isReady: false,
			error: action.error,
			hasLoadedAll: false,
		};
	case UPDATE_ONBOARDING_LOADING:
		return {
			...state,
			isPatching: true,
			error: false,
		};
	case UPDATE_ONBOARDING_SUCCESS:
		return {
			...state,
			isPatching: false,
			error: false,
			items: mergeItems(state.items, action.item),
		};
	case UPDATE_ONBOARDING_FAILURE:
		return {
			...state,
			isPatching: true,
			error: action.error,
		};
	case RESET_ERROR:
		return {
			...state,
			error: false,
		};
	default:
		return state;
	}
};
