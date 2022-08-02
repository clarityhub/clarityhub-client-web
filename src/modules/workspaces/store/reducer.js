import mergeItems from 'utilities/mergeItems';
import removeItems from 'utilities/removeItems';
import {
	GET_ALL_LOADING,
	GET_ALL_SUCCESS,
	GET_ALL_FAILURE,
	CREATE_WORKSPACE_LOADING,
	CREATE_WORKSPACE_SUCCESS,
	CREATE_WORKSPACE_FAILURE,
	GET_LOADING,
	GET_SUCCESS,
	GET_FAILURE,
	UPDATE_WORKSPACE_LOADING,
	UPDATE_WORKSPACE_SUCCESS,
	UPDATE_WORKSPACE_FAILURE,
	DELETE_WORKSPACE_LOADING,
	DELETE_WORKSPACE_SUCCESS,
	DELETE_WORKSPACE_FAILURE,
} from './constants';

export default (state = {
	items: [],
	hasLoadedAll: false,
	isReady: false,
	isCreating: false,
	isPatching: false,
	error: false,
	errorCurrentWorkspace: false,
}, action = {}) => {
	switch (action.type) {
	case GET_LOADING:
		return {
			...state,
			isReady: false,
			errorCurrentWorkspace: false,
		};
	case GET_SUCCESS:
		return {
			...state,
			isReady: true,
			errorCurrentWorkspace: false,
			items: mergeItems(state.items, action.item),
		};
	case GET_FAILURE:
		return {
			...state,
			isReady: false,
			errorCurrentWorkspace: action.error,
		};
	case GET_ALL_LOADING:
		return {
			...state,
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
	case CREATE_WORKSPACE_LOADING:
		return {
			...state,
			isCreating: true,
		};
	case CREATE_WORKSPACE_SUCCESS:
		return {
			...state,
			loading: false,
			isCreating: false,
		};
	case CREATE_WORKSPACE_FAILURE:
		return {
			...state,
			isCreating: false,
			error: action.error,
		};
	case UPDATE_WORKSPACE_LOADING:
		return {
			...state,
			error: false,
			isPatching: true,
		};
	case UPDATE_WORKSPACE_SUCCESS:
		return {
			...state,
			error: false,
			isPatching: false,
			items: mergeItems(state.items, action.item),
		};
	case UPDATE_WORKSPACE_FAILURE:
		return {
			...state,
			error: action.error,
			isPatching: false,
		};
	case DELETE_WORKSPACE_LOADING:
		return {
			...state,
			error: false,
			isPatching: true,
		};
	case DELETE_WORKSPACE_SUCCESS:
		return {
			...state,
			error: false,
			isPatching: false,
			items: removeItems(state.items, action.item.id),
		};
	case DELETE_WORKSPACE_FAILURE:
		return {
			...state,
			error: action.error,
			isPatching: false,
		};
	default:
		return state;
	}
};
