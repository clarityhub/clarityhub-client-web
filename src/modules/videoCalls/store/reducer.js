import mergeItems from 'utilities/mergeItems';
import removeItems from 'utilities/removeItems';

import {
	GET_VIDEO_CALL_LOADING,
	GET_VIDEO_CALL_SUCCESS,
	GET_VIDEO_CALL_FAILURE,
	CREATE_VIDEO_CALL_LOADING,
	CREATE_VIDEO_CALL_SUCCESS,
	CREATE_VIDEO_CALL_FAILURE,
	UPDATE_VIDEO_CALL_LOADING,
	UPDATE_VIDEO_CALL_SUCCESS,
	UPDATE_VIDEO_CALL_FAILURE,
	DELETE_VIDEO_CALL_LOADING,
	DELETE_VIDEO_CALL_SUCCESS,
	DELETE_VIDEO_CALL_FAILURE,
	START_SESSION_VIDEO_CALL_LOADING,
	START_SESSION_VIDEO_CALL_SUCCESS,
	START_SESSION_VIDEO_CALL_FAILURE,
	JOIN_SESSION_VIDEO_CALL_LOADING,
	JOIN_SESSION_VIDEO_CALL_SUCCESS,
	JOIN_SESSION_VIDEO_CALL_FAILURE,
	END_SESSION_VIDEO_CALL_LOADING,
	END_SESSION_VIDEO_CALL_SUCCESS,
	END_SESSION_VIDEO_CALL_FAILURE,
} from './constants';

export default (state = {
	items: [],
	error: false,
}, action = {}) => {
	switch (action.type) {
	case GET_VIDEO_CALL_LOADING:
	case CREATE_VIDEO_CALL_LOADING:
	case UPDATE_VIDEO_CALL_LOADING:
	case DELETE_VIDEO_CALL_LOADING:
	case START_SESSION_VIDEO_CALL_LOADING:
	case JOIN_SESSION_VIDEO_CALL_LOADING:
	case END_SESSION_VIDEO_CALL_LOADING:
		return {
			...state,
			error: false,
		};
	case GET_VIDEO_CALL_SUCCESS:
	case CREATE_VIDEO_CALL_SUCCESS:
	case UPDATE_VIDEO_CALL_SUCCESS:
	case START_SESSION_VIDEO_CALL_SUCCESS:
	case JOIN_SESSION_VIDEO_CALL_SUCCESS:
	case END_SESSION_VIDEO_CALL_SUCCESS:
		return {
			...state,
			error: false,
			items: mergeItems(state.items, action.item),
		};
	case GET_VIDEO_CALL_FAILURE:
	case CREATE_VIDEO_CALL_FAILURE:
	case UPDATE_VIDEO_CALL_FAILURE:
	case DELETE_VIDEO_CALL_FAILURE:
	case START_SESSION_VIDEO_CALL_FAILURE:
	case JOIN_SESSION_VIDEO_CALL_FAILURE:
	case END_SESSION_VIDEO_CALL_FAILURE:
		return {
			...state,
			error: action.error,
		};
	case DELETE_VIDEO_CALL_SUCCESS:
		return {
			...state,
			error: false,
			items: removeItems(state.items, action.item.id),
		};
	default:
		return state;
	}
};
