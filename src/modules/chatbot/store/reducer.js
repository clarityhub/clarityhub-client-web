import uuid from 'uuid/v4';
import {
	OPEN,
	CLOSE,
	CREATE_CONVERSATION,
} from './constants';

export default (state = {
	conversations: [],
	currentConversationId: null,
	isOpen: false,
}, action = {}) => {
	switch (action.type) {
	case OPEN:
		return {
			...state,
			isOpen: true,
		};
	case CLOSE:
		return {
			...state,
			isOpen: false,
		};
	case CREATE_CONVERSATION: {
		const id = uuid();
		return {
			...state,
			conversations: [...state.conversations, {
				id,
				...action.script,
				messages: [action.script.message],
			}],
			currentConversationId: id,
		};
	}
	default:
		return state;
	}
};
