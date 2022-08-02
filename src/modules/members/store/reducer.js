import mergeItems from 'utilities/mergeItems';
import removeItems from 'utilities/removeItems';
import {
	GET_ALL_LOADING,
	GET_ALL_SUCCESS,
	GET_ALL_FAILURE,
	GET_MEMBER_LOADING,
	GET_MEMBER_SUCCESS,
	GET_MEMBER_FAILURE,
	GET_ME_LOADING,
	GET_ME_SUCCESS,
	GET_ME_FAILURE,
	INVITE_LOADING,
	INVITE_SUCCESS,
	INVITE_FAILURE,
	RESEND_INVITE_LOADING,
	RESEND_INVITE_SUCCESS,
	RESEND_INVITE_FAILURE,
	KICK_LOADING,
	KICK_SUCCESS,
	KICK_FAILURE,
	LEAVE_LOADING,
	LEAVE_SUCCESS,
	LEAVE_FAILURE,
	UPDATE_MEMBER_LOADING,
	UPDATE_MEMBER_SUCCESS,
	UPDATE_MEMBER_FAILURE,
	UPDATE_MEMBER_METADATA_LOADING,
	UPDATE_MEMBER_METADATA_SUCCESS,
	UPDATE_MEMBER_METADATA_FAILURE,
} from './constants';

export default (state = {
	items: [],
	me: {},
	hasLoadedAll: false,
	hasLoadedMe: false,
	isReady: false,
	isCreating: false,
	isPatching: false,
	error: false,
	getMeError: false,
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
	case GET_MEMBER_LOADING:
		return {
			...state,
			isReady: false,
			error: false,
		};
	case GET_MEMBER_SUCCESS:
		return {
			...state,
			isReady: true,
			error: false,
			items: mergeItems(state.items, action.item, 'userId'),
		};
	case GET_MEMBER_FAILURE:
		return {
			...state,
			isReady: true,
			error: action.error,
		};
	case GET_ME_LOADING:
		return {
			...state,
			isReady: false,
			getMeError: false,
		};
	case GET_ME_SUCCESS:
		return {
			...state,
			isReady: true,
			getMeError: false,
			hasLoadedMe: true,
			me: action.item,
			items: mergeItems(state.items, action.item, 'userId'),
		};
	case GET_ME_FAILURE:
		return {
			...state,
			isReady: true,
			getMeError: action.error,
		};
	case INVITE_LOADING:
		return {
			...state,
			isCreating: true,
			error: false,
		};
	case INVITE_SUCCESS:
		return {
			...state,
			isCreating: false,
			error: false,
			items: mergeItems(state.items, action.item, 'userId'),
		};
	case INVITE_FAILURE:
		return {
			...state,
			isCreating: false,
			error: action.error,
		};
	case RESEND_INVITE_LOADING:
		return {
			...state,
			isCreating: true,
		};
	case RESEND_INVITE_SUCCESS:
		return {
			...state,
			isCreating: false,
			error: false,
			items: mergeItems(state.items, action.item, 'userId'),
		};
	case RESEND_INVITE_FAILURE:
		return {
			...state,
			isCreating: false,
			error: action.error,
		};
	case KICK_SUCCESS:
		return {
			...state,
			isPatching: false,
			error: false,
			items: removeItems(state.items, action.item.userId, 'userId'),
		};
	case LEAVE_LOADING:
		return {
			...state,
			isPatching: true,
		};
	case LEAVE_SUCCESS:
		return {
			...state,
			isPatching: false,
		};
	case LEAVE_FAILURE:
		return {
			...state,
			isPatching: false,
			error: action.error,
		};
	case KICK_LOADING:
	case UPDATE_MEMBER_LOADING:
	case UPDATE_MEMBER_METADATA_LOADING:
		return {
			...state,
			isPatching: true,
			error: false,
		};
	case UPDATE_MEMBER_SUCCESS:
	case UPDATE_MEMBER_METADATA_SUCCESS:
		return {
			...state,
			isPatching: false,
			error: false,
			items: mergeItems(state.items, action.item, 'userId'),
			me: action.me ? {
				...state.me,
				...action.item,
			 } : state.me,
		};
	case KICK_FAILURE:
	case UPDATE_MEMBER_FAILURE:
	case UPDATE_MEMBER_METADATA_FAILURE:
		return {
			...state,
			isPatching: false,
			error: action.error,
		};
	default:
		return state;
	}
};
