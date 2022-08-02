import {
	OPEN_RIGHT_PANE,
	CLOSE_RIGHT_PANE,
	RESET_RIGHT_PANE,
	OPEN_LEFT_PANE,
	CLOSE_LEFT_PANE,
} from './constants';

/*
when: {
    type: 'interview',
    id: '{interview.id}',
},
view: {
    type: 'media',
    id: '{media.id}'
}
*/
export const openRightPane = (when, view) => {
	return {
		type: OPEN_RIGHT_PANE,
		when,
		view,
	};
};

export const closeRightPane = () => {
	return {
		type: CLOSE_RIGHT_PANE,
	};
};

export const resetRightPane = () => {
	return {
		type: RESET_RIGHT_PANE,
	};
};

export const openLeftPane = () => ({
	type: OPEN_LEFT_PANE,
});

export const closeLeftPane = () => ({
	type: CLOSE_LEFT_PANE,
});
