import {
	PUSHER_CONNECTING,
	PUSHER_CONNECTED,
	PUSHER_CONNECTION_FAILED,
	PUSHER_CLOSING,
	PUSHER_CLOSED,
	PUSHER_CLOSE_FAILED,
} from './constants';

export const connectPusher = () => (dispatch, getState, { services }) => {
	dispatch({
		type: PUSHER_CONNECTING,
	});

	return services.pusher.connect({
		workspaceId: getState().session.currentWorkspaceId,
		dispatch,
		onOpen: () => {
			dispatch({
				type: PUSHER_CONNECTED,
			});
		},
		onError(e) {
			dispatch({
				type: PUSHER_CONNECTION_FAILED,
				error: e,
			});
		},
	});
};

export const closePusher = () => (dispatch, getState, { services }) => {
	dispatch({
		type: PUSHER_CLOSING,
	});

	return services.pusher.close().then(() => {
		dispatch({
			type: PUSHER_CLOSED,
		});
	})
		.catch((e) => {
			dispatch({
				type: PUSHER_CLOSE_FAILED,
				error: e,
			});
		});
};
