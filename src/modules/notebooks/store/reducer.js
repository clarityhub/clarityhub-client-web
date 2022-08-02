import mergeItems from 'utilities/mergeItems';
import removeItems from 'utilities/removeItems';
import {
	SET_CURRENT_NOTEBOOK,
	GET_ALL_LOADING,
	GET_ALL_SUCCESS,
	GET_ALL_FAILURE,
	CREATE_NOTEBOOK_LOADING,
	CREATE_NOTEBOOK_SUCCESS,
	CREATE_NOTEBOOK_FAILURE,
	GET_NOTEBOOK_LOADING,
	GET_NOTEBOOK_SUCCESS,
	GET_NOTEBOOK_FAILURE,
	UPDATE_NOTEBOOK_LOADING,
	UPDATE_NOTEBOOK_SUCCESS,
	UPDATE_NOTEBOOK_FAILURE,
	DELETE_NOTEBOOK_LOADING,
	DELETE_NOTEBOOK_SUCCESS,
	DELETE_NOTEBOOK_FAILURE,
} from './constants';

export default (state = {
	items: [],
	hasLoadedAll: false,
	isReady: false,
	isCreating: false,
	isPatching: false,
	error: false,
	currentNotebook: null,
}, action = {}) => {
	switch (action.type) {
	case SET_CURRENT_NOTEBOOK:
		return {
			...state,
			currentNotebook: action.item.id,
		};
	case GET_ALL_LOADING:
		return {
			...state,
			isReady: false,
			error: false,
			hasLoadedAll: false,
		};
	case GET_ALL_SUCCESS:
		return {
			...state,
			isReady: true,
			error: false,
			items: action.items,
			hasLoadedAll: true,
		};
	case GET_ALL_FAILURE:
		return {
			...state,
			isReady: false,
			error: action.error,
			hasLoadedAll: false,
		};
	case CREATE_NOTEBOOK_LOADING:
		return {
			...state,
			isCreating: true,
			error: false,
		};
	case CREATE_NOTEBOOK_SUCCESS:
		return {
			...state,
			isCreating: false,
			error: false,
			items: mergeItems(state.items, action.item),
		};
	case CREATE_NOTEBOOK_FAILURE:
		return {
			...state,
			isCreating: false,
			error: action.error,
		};
	case GET_NOTEBOOK_LOADING:
		return {
			...state,
			isReady: false,
			error: false,
		};
	case GET_NOTEBOOK_SUCCESS:
		return {
			...state,
			isReady: true,
			error: false,
			items: mergeItems(state.items, action.item),
		};
	case GET_NOTEBOOK_FAILURE:
		return {
			...state,
			isReady: true,
			error: action.error,
		};
	case DELETE_NOTEBOOK_LOADING:
	case UPDATE_NOTEBOOK_LOADING:
		return {
			...state,
			isPatching: true,
			error: false,
		};
	case UPDATE_NOTEBOOK_SUCCESS:
		return {
			...state,
			isPatching: false,
			error: false,
			items: mergeItems(state.items, action.item),
		};
	case DELETE_NOTEBOOK_FAILURE:
	case UPDATE_NOTEBOOK_FAILURE:
		return {
			...state,
			isPatching: false,
			error: action.error,
		};
	case DELETE_NOTEBOOK_SUCCESS:
		return {
			...state,
			isPatching: false,
			error: false,
			items: removeItems(state.items, action.item.id),
		};
	default:
		return state;
	}
};
