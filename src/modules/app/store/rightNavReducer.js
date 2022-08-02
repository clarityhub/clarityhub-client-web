import {
	OPEN_RIGHT_PANE,
	CLOSE_RIGHT_PANE,
	RESET_RIGHT_PANE,
} from './constants';

const initialState = {
	isOpen: false,
	when: {},
	view: {},
};

export default (state = initialState, action = {}) => {
	switch (action.type) {
	case OPEN_RIGHT_PANE:
		return {
			...state,
			isOpen: true,
			when: action.when,
			view: action.view,
		};
	case CLOSE_RIGHT_PANE:
		return {
			...state,
			isOpen: false,
		};
	case RESET_RIGHT_PANE:
		return initialState;
	default:
		return state;
	}

};
