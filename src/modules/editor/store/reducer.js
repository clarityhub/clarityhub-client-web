import {
	SET_TARGET_EDITOR,
	CLEAR_TARGET_EDITOR,
} from './constants';

export default (state = {
	target: null,
}, action = {}) => {
	switch (action.type) {
	case SET_TARGET_EDITOR:
		return {
			...state,
			target: action.target,
		};
	case CLEAR_TARGET_EDITOR:
		return {
			...state,
			target: false,
		};
	default:
		return state;

	}
};
