import { useEffect } from 'react';

const connectPusher = ({ videoCall, onRealtimeUpdate, services }) => {
	const rawPusher = services.pusher.manualConnect();
	const channel = rawPusher.subscribe(videoCall.id);

	channel.bind('room.complete', (data) => {
		onRealtimeUpdate('room.complete', data);
	});
};

const closePusher = ({ services }) => {
	const rawPusher = services.pusher.manualConnect();
	rawPusher.disconnect();
};

const Pusher = ({ children, videoCall, onRealtimeUpdate, services }) => {
	useEffect(() => {
		connectPusher({ videoCall, onRealtimeUpdate, services });

		return () => closePusher({ services });
	}, [onRealtimeUpdate, services, videoCall]);

	return children;
};

export default Pusher;
