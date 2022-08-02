
export const defaultState = {
	error: null,
	loading: true,
	videoCall: {},
	identity: {
		isAdmin: false,
		token: null,
		password: null,
		name: null,
	},
	twilio: {},
	callState: 'PARTICIPATING',
};

export default (state = defaultState, action = {}) => {
	switch (action.type) {
	case 'INIT':
		return {
			...state,
			identity: {
				isAdmin: action.isAdmin,
				token: action.token,
				password: action.password,
			},
		};
	case 'ROOM':
		return {
			...state,
			loading: false,
			videoCall: action.item,
		};
	case 'JOIN':
		return {
			...state,
			identity: {
				...state.identity,
				token: action.item.token,
			},
		};
	case 'ROOM_COMPLETE':
	case 'END_SESSION': {
		return {
			...state,
			videoCall: {
				...state.videoCall,
				status: 'COMPLETE',
			},
			callState: 'COMPLETE',
		};
	}
	case 'ROOM_LEAVE': {
		return {
			...state,
			callState: 'LEAVE',
		};
	}

	case 'ERROR':
		return {
			...state,
			error: action.error,
		};
	default:
		return state;
	}
};
