import React, { useReducer, useCallback, useEffect } from 'react';
import queryString from 'query-string';
import FullPageLoader from 'modules/app/layouts/FullPageLoader';
import { getStore } from 'store.js';
import { useServices } from 'services';

import VideoCallPusher from '../components/VideoCallPusher';
import Lobby from '../components/Lobby';
import LobbyWaiting from '../components/LobbyWaiting';
import LobbyCapability from '../components/LobbyCapability';
import Room from '../containers/Room';
import reducer from '../store/reducer';
import apis from '../store/apis';
import PostCall from './PostCall';

function checkIfBrowserSupported() {
	const isWebRTCSupported = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        window.RTCPeerConnection;

	if (window.navigator.userAgent.indexOf('Edge') > -1) {
		return false;
	}

	if (isWebRTCSupported) {
		return true;
	}
	return false;
}

const VideoCallPage = ({ match, location, isAdmin }) => {
	const services = useServices();
	const shortId = match.params.shortId;
	const parsed = queryString.parse(location.search);
	const password = parsed.p;
	const token = parsed.token;

	const browserSupported = checkIfBrowserSupported();

	const [state, dispatch] = useReducer(reducer, reducer(undefined, {
		type: 'INIT',
		isAdmin,
		password: password ? atob(password) : null,
		token,
	}));

	const handleLeave = useCallback(() => {
		dispatch({
			type: 'ROOM_LEAVE',
		});
	}, []);

	const handleEndSession = useCallback(async () => {
		try {
			const token = getStore().getState().session.accessToken;
			const response = await services.BaseApi.post(`/videoCalls/${state.videoCall.id}/actions/end`, {}, { token });
			dispatch({
				type: 'END_SESSION',
				item: response,
			});
		} catch (error) {
			dispatch({
				type: 'ERROR',
				error,
			});
		}
	}, [state, services]);

	const handleRealtimeUpdate = useCallback((key, data) => {
		switch (key) {
		case 'room.complete':
			dispatch({
				type: 'ROOM_COMPLETE'
			});
			break;
		default:

		}
	}, []);

	const handleGet = useCallback(async () => {
		try {
			const response = await apis.get(shortId, state.identity.password);
			dispatch({
				type: 'ROOM',
				item: response,
			});
		} catch (error) {
			dispatch({
				type: 'ERROR',
				error,
			});
		}
	}, [state.identity.password, shortId]);

	const handleJoin = useCallback(async (values) => {
		try {
			const response = await apis.join(shortId, values);
			dispatch({
				type: 'JOIN',
				item: response,
			});
		} catch (error) {
			dispatch({
				type: 'ERROR',
				error,
			});
		}
	}, [shortId]);

	useEffect(() => {
		if (shortId && state.identity.password) {
			handleGet();
		}
	}, [state.identity.password, shortId, handleGet]);

	/*
	 * Unsupported browser
	 */
	if (!browserSupported) {
		return (
			<LobbyCapability/>
		);
	}

	/*
	 * Call session was ended while user was on the call
	 */
	if (state.callState !== 'PARTICIPATING') {
		return (
			<PostCall type={state.callState} videoCall={state.videoCall} />
		);
	}

	/*
	 * Waiting for session to start
	 */
	if (state.videoCall && state.videoCall.status !== 'ACTIVE') {
		return (
			<FullPageLoader
				error={state.error}
				loading={false}
				render={() => {
					return <LobbyWaiting
						videoCall={state.videoCall}
						onRetry={handleGet}
					/>;
				}}
			/>

		);
	}

	/*
	 * Get session credentials
	 */
	if (!state.identity.token) {
		return (
			<FullPageLoader
				error={state.error}
				loading={state.loading}
				render={() => {
					return <Lobby
						videoCall={state.videoCall}
						identity={state.identity}
						onJoin={handleJoin}
					/>;
				}}
			/>
		);
	}

	/*
	 * Joining Session
	 */
	return (
		<FullPageLoader
			error={state.error}
			loading={state.loading || !state.identity.token}
			render={() => {
				return (
					<VideoCallPusher videoCall={state.videoCall} onRealtimeUpdate={handleRealtimeUpdate} services={services}>
						<Room
							videoCall={state.videoCall}
							token={state.identity.token}
							onLeave={handleLeave}
							isAdmin={state.identity.isAdmin}
							onEndSession={handleEndSession}
						/>
					</VideoCallPusher>
				);
			}}
		/>
	);

};

export default VideoCallPage;

