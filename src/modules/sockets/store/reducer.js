import {
	PUSHER_CONNECTING,
	PUSHER_CONNECTED,
	PUSHER_CONNECTION_FAILED,
	PUSHER_CLOSING,
	PUSHER_CLOSED,
	PUSHER_CLOSE_FAILED,
} from './constants';

const NOT_CONNECTED = 'NOT_CONNECTED';
const CONNECTING = 'CONNECTING';
const CONNECTED = 'CONNECTED';
const CLOSING = 'CLOSING_CONNECTION';

export default (state = {
	pusherStatus: NOT_CONNECTED,
	error: null,
}, action = {}) => {
	switch (action.type) {
	case PUSHER_CONNECTING:
		return {
			...state,
			pusherStatus: CONNECTING,
			error: null,
		};
	case PUSHER_CONNECTED:
		return {
			...state,
			pusherStatus: CONNECTED,
			error: null,
		};
	case PUSHER_CONNECTION_FAILED:
		return {
			...state,
			pusherStatus: NOT_CONNECTED,
			error: action.error,
		};
	case PUSHER_CLOSING:
		return {
			...state,
			pusherStatus: CLOSING,
			error: null,
		};
	case PUSHER_CLOSED:
		return {
			...state,
			pusherStatus: NOT_CONNECTED,
			error: null,
		};
	case PUSHER_CLOSE_FAILED:
		return {
			...state,
			error: action.error,
		};
	default:
		return state;
	}
};
