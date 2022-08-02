import getVideoCallLink from '../utilities/getVideoCallLink';
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

/**
 * Get video call by id
 *
 * @param {String} id
 */
export const getVideoCall = (id) => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_VIDEO_CALL_LOADING,
	});

	return services.api.videoCalls.get(id).then((response) => {
		dispatch({
			type: GET_VIDEO_CALL_SUCCESS,
			item: response,
		});

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_VIDEO_CALL_FAILURE,
				error,
			});
			throw error;
		});
};

/**
 * Create a video call
 *
 * @param {VideoCall} payload
 */
export const createVideoCall = (payload) => (dispatch, getState, { services }) => {
	dispatch({
		type: CREATE_VIDEO_CALL_LOADING,
	});

	return services.api.videoCalls.create(payload).then((response) => {
		dispatch({
			type: CREATE_VIDEO_CALL_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: CREATE_VIDEO_CALL_FAILURE,
				error,
			});

			throw error;
		});
};

/**
 * Update a video call by id
 *
 * @param {String} id
 * @param {VideoCall} payload
 */
export const updateVideoCall = (id, payload) => (dispatch, getState, { services }) => {
	dispatch({
		type: UPDATE_VIDEO_CALL_LOADING,
	});

	return services.api.videoCalls.update(id, payload).then((response) => {
		dispatch({
			type: UPDATE_VIDEO_CALL_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_VIDEO_CALL_FAILURE,
				error,
			});

			throw error;
		});
};

/**
 * Video Call has been updated via notification.
 *
 * Used by real-time notifications
 *
 * @param {Object} payload
 */
export const updatedVideoCall = (payload) => {
	return {
		type: UPDATE_VIDEO_CALL_SUCCESS,
		item: payload.item,
	};
};


/**
 * Delete a video call by id
 *
 * @param {String} id
 */
export const deleteVideoCall = (id) => (dispatch, getState, { services }) => {
	dispatch({
		type: DELETE_VIDEO_CALL_LOADING,
	});

	return services.api.videoCalls.delete(id).then((response) => {
		dispatch({
			type: DELETE_VIDEO_CALL_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: DELETE_VIDEO_CALL_FAILURE,
				error,
			});

			throw error;
		});
};

export const startSession = (id) => (dispatch, getState, { services }) => {
	dispatch({
		type: START_SESSION_VIDEO_CALL_LOADING,
	});

	const win = window.open('', '_blank');

	return services.api.videoCalls.start(id).then((response) => {
		dispatch({
			type: START_SESSION_VIDEO_CALL_SUCCESS,
			item: response,
		});

		const { token } = response;

		// Open link in new tab
		win.location = getVideoCallLink(response, token);
		win.focus();

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: START_SESSION_VIDEO_CALL_FAILURE,
				error,
			});

			win.close();
			window.focus();

			throw error;
		});
};

export const joinSession = (id) => (dispatch, getState, { services }) => {
	dispatch({
		type: JOIN_SESSION_VIDEO_CALL_LOADING,
	});

	const win = window.open('', '_blank');

	return services.api.videoCalls.join(id).then((response) => {
		dispatch({
			type: JOIN_SESSION_VIDEO_CALL_SUCCESS,
			item: response,
		});

		const { token } = response;

		// Open link in new tab
		win.location = getVideoCallLink(response, token);
		win.focus();

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: JOIN_SESSION_VIDEO_CALL_FAILURE,
				error,
			});

			win.close();
			window.focus();

			throw error;
		});
};

export const endSession = (id) => (dispatch, getState, { services }) => {
	dispatch({
		type: END_SESSION_VIDEO_CALL_LOADING,
	});

	return services.api.videoCalls.end(id).then((response) => {
		dispatch({
			type: END_SESSION_VIDEO_CALL_SUCCESS,
			item: response,
		});

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: END_SESSION_VIDEO_CALL_FAILURE,
				error,
			});

			throw error;
		});
};
