import {
	LOGOUT,
	LOGIN_REFRESHING,
	LOGIN_REFRESHED,
	LOGIN_LOADING,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
} from './constants';

export default (state = {
	accessToken: null,
	refreshToken: null,
	currentWorkspaceId: null,
	loggingIn: false,
}, action = {}) => {
	switch (action.type) {
	case LOGOUT:
		return {
			accessToken: null,
			refreshToken: null,
			currentWorkspaceId: null,
			loggingIn: false,
		};
	case LOGIN_REFRESHING:
		return {
			...state,
		};
	case LOGIN_REFRESHED:
		return {
			...state,
			accessToken: action.accessToken,
			accessTokenDecoded: action.accessTokenDecoded,
		};
	case LOGIN_LOADING:
		return {
			...state,
			loggingIn: true,
		};
	case LOGIN_SUCCESS:
		return {
			...state,
			accessToken: action.accessToken,
			accessTokenDecoded: action.accessTokenDecoded,
			refreshToken: action.refreshToken,
			currentWorkspaceId: action.workspaceId,
			loggingIn: false,
		};
	case LOGIN_FAILURE:
		return {
			...state,
		};
	default:
		return state;
	}
};
