import mergeItems from 'utilities/mergeItems';
import removeItems from 'utilities/removeItems';

import {
	GET_ALL_TAGS_LOADING,
	GET_ALL_TAGS_SUCCESS,
	GET_ALL_TAGS_FAILURE,
	GET_TAG_LOADING,
	GET_TAG_SUCCESS,
	GET_TAG_FAILURE,
	CREATE_TAG_LOADING,
	CREATE_TAG_SUCCESS,
	CREATE_TAG_FAILURE,
	UPDATE_TAG_LOADING,
	UPDATE_TAG_SUCCESS,
	UPDATE_TAG_FAILURE,
	DELETE_TAG_LOADING,
	DELETE_TAG_SUCCESS,
	DELETE_TAG_FAILURE,
} from './constants';

export default (state = {
	items: [],
	isLoading: false,
	isReady: false,
	hasLoadedAll: false,
	isCreating: false,
	isPatching: false,
	error: false,
}, action = {}) => {
	switch (action.type) {
	case GET_ALL_TAGS_LOADING:
		return {
			...state,
			isReady: false,
			isLoading: true,
			hasLoadedAll: false,
		};
	case GET_ALL_TAGS_SUCCESS:
		return {
			...state,
			isReady: true,
			isLoading: false,
			hasLoadedAll: true,
			items: action.items,
		};
	case GET_ALL_TAGS_FAILURE:
		return {
			...state,
			isReady: false,
			isLoading: false,
			hasLoadedAll: false,
			error: action.error,
		};
	case GET_TAG_LOADING:
		return {
			...state,
			isReady: false,
		};
	case GET_TAG_SUCCESS:
		return {
			...state,
			isReady: true,
			items: mergeItems(state.items, action.item, 'tagPath'),
		};
	case GET_TAG_FAILURE:
		return {
			...state,
			error: action.error,
		};
	case CREATE_TAG_LOADING:
		return {
			...state,
			isCreating: true,
		};
	case CREATE_TAG_SUCCESS:
		return {
			...state,
			isCreating: false,
			items: mergeItems(state.items, action.item, 'tagPath'),
		};
	case CREATE_TAG_FAILURE:
		return {
			...state,
			isCreating: false,
			error: action.error,
		};
	case UPDATE_TAG_LOADING:
		return {
			...state,
			isPatching: true,
		};
	case UPDATE_TAG_SUCCESS:
		return {
			...state,
			isPatching: false,
			items: mergeItems(state.items, action.item, 'tagPath'),
		};
	case UPDATE_TAG_FAILURE:
		return {
			...state,
			isPatching: false,
			error: action.error,
		};
	case DELETE_TAG_LOADING:
		return {
			...state,
			isPatching: true,
		};
	case DELETE_TAG_SUCCESS:
		return {
			...state,
			isPatching: false,
			items: removeItems(
				removeItems(
					state.items,
					action.item.tags[0].tagPath,
					'tagPath',
				),
				action.item.tags[0].tagPath,
				'parentTagId',
			),
		};
	case DELETE_TAG_FAILURE:
		return {
			...state,
			isPatching: false,
			error: action.error,
		};
	default:
		return state;
	}
};
