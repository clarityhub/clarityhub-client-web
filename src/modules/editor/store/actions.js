import {
	SET_TARGET_EDITOR,
	CLEAR_TARGET_EDITOR,
} from './constants';

export const setTargetEditor = (editor) => ({
	type: SET_TARGET_EDITOR,
	target: editor,
});

export const clearTargetEditor = () => ({
	type: CLEAR_TARGET_EDITOR,
});
