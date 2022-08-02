import {
	OPEN_LEFT_PANE,
	CLOSE_LEFT_PANE,
} from './constants';

const initialState = {
	isOpen: false,
};

export default (state = initialState, action = {}) => {
	switch (action.type) {
	case OPEN_LEFT_PANE:
		return {
			...state,
			isOpen: true,
		};
	case CLOSE_LEFT_PANE:
		return {
			...state,
			isOpen: false,
		};
	default:
		return state;
	}
};
