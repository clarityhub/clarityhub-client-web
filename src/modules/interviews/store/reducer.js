import mergeItems from 'utilities/mergeItems';
import removeItems from 'utilities/removeItems';
import {
	GET_ALL_LOADING,
	GET_ALL_SUCCESS,
	GET_ALL_FAILURE,
	CREATE_INTERVIEW_LOADING,
	CREATE_INTERVIEW_SUCCESS,
	CREATE_INTERVIEW_FAILURE,
	GET_INTERVIEW_LOADING,
	GET_INTERVIEW_SUCCESS,
	GET_INTERVIEW_FAILURE,
	UPDATE_INTERVIEW_LOADING,
	UPDATE_INTERVIEW_SUCCESS,
	UPDATE_INTERVIEW_FAILURE,
	DELETE_INTERVIEW_LOADING,
	DELETE_INTERVIEW_SUCCESS,
	DELETE_INTERVIEW_FAILURE,
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
	case CREATE_INTERVIEW_LOADING:
		return {
			...state,
			isCreating: true,
			error: false,
		};
	case CREATE_INTERVIEW_SUCCESS:
		return {
			...state,
			isCreating: false,
			error: false,
			items: mergeItems(state.items, action.item),
		};
	case CREATE_INTERVIEW_FAILURE:
		return {
			...state,
			isCreating: false,
			error: action.error,
		};
	case GET_INTERVIEW_LOADING:
		return {
			...state,
			isReady: false,
			error: false,
		};
	case GET_INTERVIEW_SUCCESS:
		return {
			...state,
			isReady: true,
			error: false,
			items: mergeItems(state.items, action.item),
		};
	case GET_INTERVIEW_FAILURE:
		return {
			...state,
			isReady: true,
			error: action.error,
		};
	case DELETE_INTERVIEW_LOADING:
	case UPDATE_INTERVIEW_LOADING:
		return {
			...state,
			isPatching: true,
			error: false,
		};
	case UPDATE_INTERVIEW_SUCCESS:
		return {
			...state,
			isPatching: false,
			error: false,
			items: mergeItems(state.items, action.item),
		};
	case DELETE_INTERVIEW_FAILURE:
	case UPDATE_INTERVIEW_FAILURE:
		return {
			...state,
			isPatching: false,
			error: action.error,
		};
	case DELETE_INTERVIEW_SUCCESS:
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
