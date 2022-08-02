import history from 'history.js';
import jwt from 'jsonwebtoken';
import {
	LOGOUT,
	LOGIN_LOADING,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_REFRESHING,
	LOGIN_REFRESHED,
} from './constants';

const decode = (accessToken) => {
	const decoded = jwt.decode(accessToken);

	return decoded;
};

export const login = ({ token }) => (_, __, { services }) => {
	return services.api.auth.login({
		token,
	});
};

export const loginWorkspace = (workspaceId, { token }) => (dispatch, _, { services }) => {
	dispatch({
		type: LOGIN_LOADING,
	});

	return services.api.auth.loginWorkspace(workspaceId, {
		token,
	}).then(response => {
		dispatch({
			type: LOGIN_SUCCESS,
			refreshToken: response.refreshToken,
			accessToken: response.accessToken,
			accessTokenDecoded: decode(response.accessToken),
			workspaceId,
		});
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: LOGIN_FAILURE,
				error,
			});

			return error;
		});
};

export const refresh = () => (dispatch, getState, { services }) => {
	dispatch({
		type: LOGIN_REFRESHING,
	});

	return services.api.auth.refresh().then(response => {
		dispatch({
			type: LOGIN_REFRESHED,
			accessToken: response.accessToken,
			accessTokenDecoded: decode(response.accessToken),
		});

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: LOGIN_FAILURE,
				error,
			});

			return error;
		});
};

/**
 * @param {options} Pass `force=true` to log the user out of their SSO.
 */
export const logout = (options) => async (dispatch, getState, { services }) => {
	if (window.location.pathname !== '/auth') {
		dispatch({
			type: LOGOUT,
		});

		history.push('/auth', {
			redirectTo: window.location.pathname,
		});

		if (options && options.force) {
			await services.Auth0.logout({
				// Tell SSO sign-ins that the user wants to logout
				federated: true,
			});
		}
	}
};
