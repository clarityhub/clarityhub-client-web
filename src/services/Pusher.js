import Pusher from 'pusher-js';
import { updatedMedia } from 'modules/medias/store/actions';
import { createdNotebook } from 'modules/notebooks/store/actions';
import { createdInterview } from 'modules/interviews/store/actions';
import { updatedVideoCall } from 'modules/videoCalls/store/actions';

let pusher;

class PusherManager {
	constructor(pusher) {
		this.pusher = pusher;
		this.channel = null;
	}

	manualConnect() {
		return this.pusher;
	}

	connect({ workspaceId, onOpen, onError, dispatch }) {
		this.channel = this.pusher.subscribe(workspaceId);

		this.channel.bind('media.updated', (data) => {
			dispatch(updatedMedia(data));
		});

		this.channel.bind('interviewV2.created', (data) => {
			dispatch(createdInterview(data));
		});

		this.channel.bind('interview.created', (data) => {
			dispatch(createdNotebook(data));
		});

		this.channel.bind('room.updated', (data) => {
			dispatch(updatedVideoCall(data));
		});

		this.channel.bind('room.complete', (data) => {
			dispatch(updatedVideoCall(data));
		});

		this.channel.bind('error', (e) => {
			onError(e);
		});

		onOpen();
		return Promise.resolve();
	}

	close() {
		this.pusher.disconnect();

		return Promise.resolve();
	}
}

export default function PusherService() {
	if (!pusher) {
		Pusher.logToConsole = true;

		pusher = new Pusher('15e1709e2345c4df8d02', {
			cluster: 'us2',
			forceTLS: true,
		});
	}

	return new PusherManager(pusher);

}
