import {
	OPEN,
	CLOSE,
	CREATE_CONVERSATION,
} from './constants';

export const open = () => ({
	type: OPEN,
});

export const close = () => ({
	type: CLOSE,
});

export const createConversation = (script) => ({
	type: CREATE_CONVERSATION,
	script,
});

export const showDrift = () => {
	window.drift && window.drift.on('ready', function showDriftReady(api) {
		api.widget.show();
	});

	return () => {};
};

export const hideDrift = () => {
	window.drift && window.drift.on('ready', function hideDriftReady(api) {
		api.widget.hide();
	});

	return () => {};
};

export const startDriftChat = () => {
	window.drift && window.drift.on('ready', function startDriftChatReady(api) {
		api.widget.show();
		api.openChat();
	});

	return () => {};
};
