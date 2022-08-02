import { logout } from 'modules/auth/store/actions';

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

export const getAllMembers = () => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_ALL_LOADING,
	});

	return services.api.members.getAll().then(response => {
		dispatch({
			type: GET_ALL_SUCCESS,
			items: response,
		});
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_ALL_FAILURE,
				error,
			});
		});
};

export const getMember = (id) => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_MEMBER_LOADING,
	});

	return services.api.members.get(id).then(response => {
		dispatch({
			type: GET_MEMBER_SUCCESS,
			item: response,
		});
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_MEMBER_FAILURE,
				error,
			});
		});
};

export const getMe = () => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_ME_LOADING,
	});

	return services.api.members.getMe().then(response => {
		dispatch({
			type: GET_ME_SUCCESS,
			item: response,
		});
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_ME_FAILURE,
				error,
			});
		});
};

export const invite = ({ email, role }) => (dispatch, getState, { services }) => {
	dispatch({
		type: INVITE_LOADING,
	});

	return services.api.members.invite({ email, role }).then(response => {
		dispatch({
			type: INVITE_SUCCESS,
			item: response,
		});
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: INVITE_FAILURE,
				error,
			});
		});
};

export const resendInvite = (id) => (dispatch, getState, { services }) => {
	dispatch({
		type: RESEND_INVITE_LOADING,
	});

	return services.api.members.resendInvite(id).then(response => {
		dispatch({
			type: RESEND_INVITE_SUCCESS,
			item: response,
		});
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: RESEND_INVITE_FAILURE,
				error,
			});
		});
};

export const kick = (id) => (dispatch, getState, { services }) => {
	dispatch({
		type: KICK_LOADING,
	});

	return services.api.members.kick(id).then(response => {
		dispatch({
			type: KICK_SUCCESS,
			item: response,
		});
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: KICK_FAILURE,
				error,
			});
		});
};

export const leave = () => (dispatch, getState, { services }) => {
	dispatch({
		type: LEAVE_LOADING,
	});

	return services.api.members.leave().then(response => {
		dispatch({
			type: LEAVE_SUCCESS,
			item: response,
		});

		// force logout
		dispatch(logout());
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: LEAVE_FAILURE,
				error,
			});
		});
};

export const update = (id, payload) => (dispatch, getState, { services }) => {
	dispatch({
		type: UPDATE_MEMBER_LOADING,
	});

	return services.api.members.update(id, payload).then(response => {
		dispatch({
			type: UPDATE_MEMBER_SUCCESS,
			item: response,
		});

		// force logout if id == self (need the user to re-log in)
		if (id === getState().members.me.userId) {
			dispatch(logout());
		}
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_MEMBER_FAILURE,
				error,
			});
		});
};

/**
 * You can only update your own metadata
 * @param {} payload
 */
export const updateMetadata = (payload) => (dispatch, getState, { services }) => {
	dispatch({
		type: UPDATE_MEMBER_METADATA_LOADING,
	});

	return services.api.auth.updateMetadata(payload).then(response => {
		dispatch({
			type: UPDATE_MEMBER_METADATA_SUCCESS,
			item: response,
			me: true,
		});

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_MEMBER_METADATA_FAILURE,
				error,
			});
		});
};
