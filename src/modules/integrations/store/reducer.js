import mergeItems from 'utilities/mergeItems';
import removeItems from 'utilities/removeItems';
import {
	GET_LOADING,
	GET_SUCCESS,
	GET_FAILURE,
	GET_INFO_LOADING,
	GET_INFO_SUCCESS,
	GET_INFO_FAILURE,
	GET_ALL_LOADING,
	GET_ALL_SUCCESS,
	GET_ALL_FAILURE,
	CREATE_LOADING,
	CREATE_SUCCESS,
	CREATE_FAILURE,
	UPDATE_LOADING,
	UPDATE_SUCCESS,
	UPDATE_FAILURE,
	TEST_LOADING,
	TEST_SUCCESS,
	TEST_FAILURE,
	DELETE_LOADING,
	DELETE_SUCCESS,
	DELETE_FAILURE,
} from './constants';

export default (state = {
	items: [],
	info: [],
	hasLoadedAll: false,
	isReady: false,
	isCreating: false,
	isPatching: false,
	isTesting: false,
	error: false,
	testResult: false,
}, action = {}) => {
	switch (action.type) {
	case GET_LOADING:
		return {
			...state,
			isReady: false,
			error: false,
		};
	case GET_SUCCESS:
		return {
			...state,
			isReady: true,
			error: false,
			items: mergeItems(state.items, action.item),
		};
	case GET_FAILURE:
		return {
			...state,
			isReady: false,
			error: action.error,
		};
	case GET_ALL_LOADING:
		return {
			...state,
			isReady: false,
		};
	case GET_ALL_SUCCESS:
		return {
			...state,
			isReady: true,
			hasLoadedAll: true,
			items: action.items,
		};
	case GET_ALL_FAILURE:
		return {
			...state,
			isReady: false,
			error: action.error,
		};
	case GET_INFO_LOADING:
		return {
			...state,
		};
	case GET_INFO_SUCCESS:
		return {
			...state,
			info: action.items,
		};
	case GET_INFO_FAILURE:
		return {
			...state,
			error: action.error,
		};
	case CREATE_LOADING:
		return {
			...state,
			isCreating: true,
		};
	case CREATE_SUCCESS:
		return {
			...state,
			isCreating: false,
			items: mergeItems(state.items, action.item),
		};
	case CREATE_FAILURE:
		return {
			...state,
			isCreating: false,
		};
	case UPDATE_LOADING:
		return {
			...state,
			error: false,
			isPatching: true,
		};
	case UPDATE_SUCCESS:
		return {
			...state,
			error: false,
			isPatching: false,
			items: mergeItems(state.items, action.item),
		};
	case UPDATE_FAILURE:
		return {
			...state,
			isPatching: false,
			error: action.error,
		};
	case TEST_LOADING:
		return {
			...state,
			isTesting: true,
			testResult: false,
		};
	case TEST_SUCCESS:
		return {
			...state,
			isTesting: false,
			testResult: action.item,
		};
	case TEST_FAILURE:
		return {
			...state,
			isTesting: false,
			testResult: action.error,
		};
	case DELETE_LOADING:
		return {
			...state,
			error: false,
			isPatching: true,
		};
	case DELETE_SUCCESS:
		return {
			...state,
			error: false,
			isPatching: false,
			items: removeItems(state.items, action.item.id),
		};
	case DELETE_FAILURE:
		return {
			...state,
			error: action.error,
			isPatching: false,
		};
	default:
		return state;
	}
};
