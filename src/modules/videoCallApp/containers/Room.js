/** @jsx jsx */
import { useState, useEffect, useCallback, useReducer } from 'react';
import Video, { LocalVideoTrack } from 'twilio-video';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

import VideoMenu from '../components/VideoMenu';
import VideoEmpty from '../components/VideoEmpty';
import VideoTitle from '../components/VideoTitle';
import usePersistentState from '../utilities/usePersistentState';
import ActiveParticipantContainer from './ActiveParticipant';
import ParticipantContainer from './Participant';

const VideoGrid = styled.div`
	display: flex;
	height: 100%;
	min-height: 500px;
	width: 100%;
	position: relative;
`;

const MainView = styled.div`
	background-color: black;
	justify-content: center;
	flex: 1;
	height: 100%;
	width: 100%;
`;

const Sidebar = styled.div`
	width: 300px;
	height: 100%;
    background: #ecf0f7;
	overflow: auto;
`;

const activeSpeakerReducer = (state, action) => {
	const chooseActive = (currentState) => {
		if (currentState.chosen) {
			// if there's a user-chosen participant, use that one
			return {
				...currentState,
				current: currentState.chosen,
			};
		} else if (currentState.dominant) {
			// use twilio-chosen if there is one
			return {
				...currentState,
				current: currentState.dominant,
			};
		} else if (currentState.first) {
			// fallback to first in line
			return {
				...currentState,
				current: currentState.first,
			};
		}
		// fallback to first in line
		return {
			...currentState,
			current: null,
		};
	};

	const updateState = () => {
		switch (action.type) {
		case 'PARTICIPANT_REMOVED':
		case 'PARTICIPANT_ADDED': {
			return {
				...state,
				first: action.participant,
			};
		}
		case 'DOMINANT_SPEAKER_CHANGED': {
			return {
				...state,
				dominant: action.participant,
			};
		}
		case 'USER_CHOSEN_ACTIVE': {
			return {
				...state,
				chosen: action.participant,
			};
		}
		default:
			return state;
		}
	};

	const tempState = updateState();

	return chooseActive(tempState);
};

const Room = ({ videoCall, token, onLeave, isAdmin, onEndSession }) => {
	const [error, setError] = useState(null);
	const [room, setRoom] = useState(null);
	const [muted, setMuted] = useState(false);
	const [hideVideo, setHideVideo] = useState(false);
	const [participants, setParticipants] = useState([]);
	const [showParticipants, setShowParticipants] = useState(true);
	const [activeSpeaker, dispatchActiveSpeaker] = useReducer(activeSpeakerReducer, { first: null, dominant: null, chosen: null, current: null });
	const [videoDeviceId, setVideoDeviceId] = usePersistentState(null, 'video-device-key');
	const [audioDeviceId, setAudioDeviceId] = usePersistentState(null, 'audio-device-key');

	const setupRoom = async () => {
		const participantConnected = participant => {
			setParticipants(prevParticipants => [...prevParticipants, participant]);
			dispatchActiveSpeaker({
				type: 'PARTICIPANT_ADDED',
				participant: participants[0],
			});
		};

		const participantDisconnected = participant => {
			setParticipants(prevParticipants => {
				return prevParticipants.filter(p => p !== participant);
			});
			dispatchActiveSpeaker({
				type: 'PARTICIPANT_REMOVED',
				participant: participants[0],
			});
		};

		const devices = await navigator.mediaDevices.enumerateDevices();
		let videoInput = devices.find(device => device.kind === 'videoinput');
		let audioInput = devices.find(device => device.kind === 'audioinput');

		if (videoDeviceId) {
			videoInput = devices.find(device => device.deviceId === videoDeviceId);
		}

		if (audioDeviceId) {
			audioInput = devices.find(device => device.deviceId === audioDeviceId);
		}

  		const tracks = await Video.createLocalTracks({
			audio: { deviceId: audioInput.deviceId },
			video: { deviceId: videoInput.deviceId },
		});

		Video.connect(token, {
			name: videoCall.id,
			dominantSpeaker: true,
			tracks,
		}).then(room => {
			setVideoDeviceId(videoInput.deviceId);
			setAudioDeviceId(audioInput.deviceId);
			setRoom(room);

			room.on('dominantSpeakerChanged', participant => {
				dispatchActiveSpeaker({
					type: 'DOMINANT_SPEAKER_CHANGED',
					participant,
				});
			});

			room.on('participantConnected', participantConnected);
			room.on('participantDisconnected', participantDisconnected);
			room.participants.forEach(participantConnected);
		})
			.catch((e) => {
				// TODO send error to bugsnag
				console.log(e);
				setError(e);
			});
	};

	useEffect(() => {
		setupRoom();

		return () => {
			setRoom(currentRoom => {
				const shouldDisconnect = currentRoom.localParticipant.state === 'connected' || currentRoom.localParticipant.state === 'disconnected';
				if (currentRoom && shouldDisconnect) {
					currentRoom.localParticipant.tracks.forEach((trackPublication) => {

						trackPublication.track.stop();
					});
					currentRoom.disconnect();
					return null;
				}
				return currentRoom;

			});
		};
	}, [token, videoCall.id]); //eslint-disable-line

	const onChangeDevice = useCallback(async (deviceId, deviceType) => {
		const nextTracks = {};

		if (deviceType === 'videoinput') {
			setVideoDeviceId(deviceId);
			nextTracks.video = { deviceId };
		} else {
			setAudioDeviceId(deviceId);
			nextTracks.audio = { deviceId };
		}

		const nextLocalTracks = await Video.createLocalTracks(nextTracks);

		if (deviceType === 'videoinput') {
			Array.from(room.localParticipant.videoTracks.values()).forEach((t) => {
				t.unpublish();
			});
		} else {
			Array.from(room.localParticipant.audioTracks.values()).forEach((t) => {
				t.unpublish();
			});
		}

		room.localParticipant.publishTracks(nextLocalTracks);
	}, [room.localParticipant, setAudioDeviceId, setVideoDeviceId]);

	const onToggleMute = useCallback(() => {
		setMuted((muted) => {
			if (muted) {
				room.localParticipant.audioTracks.forEach(audioTrack => {
					audioTrack.track.enable();
				});
			} else {
				room.localParticipant.audioTracks.forEach(audioTrack => {
					audioTrack.track.disable();
				});
			}
			return !muted;
		});
	}, [room, setMuted]);

	const onToggleVideo = useCallback(() => {
		setHideVideo((muted) => {
			if (muted) {
				room.localParticipant.videoTracks.forEach(audioTrack => {
					audioTrack.track.enable();
				});
			} else {
				room.localParticipant.videoTracks.forEach(audioTrack => {
					audioTrack.track.disable();
				});
			}
			return !muted;
		});
	}, [room, setHideVideo]);

	const onSetActiveParticipant = (participant) => {
		dispatchActiveSpeaker({
			type: 'USER_CHOSEN_ACTIVE',
			participant,
		});
	};

	const onShareScreen = async () => {
		const stream = await navigator.mediaDevices.getDisplayMedia();
		const screenTrack = new LocalVideoTrack(stream.getTracks()[0]);

		// TODO: set shared screen as active participant
		// screensharing participant is also probably dominant speaker...?
		room.localParticipant.publishTrack(screenTrack);

		screenTrack.on('stopped', () => {
			room.localParticipant.unpublishTrack(screenTrack);
		});
	};

	const remoteParticipants = participants.map(participant => (
		<ParticipantContainer
			key={participant.sid}
			participant={participant}
			pinned={activeSpeaker.current?.sid === participant.sid}
			onSetActiveParticipant={onSetActiveParticipant}
			muted={false}
		/>
	));

	if (error) {
		return <Error error={error} refresh />;
	}

	return (
		<Box className="room" flex={1}>
			 <VideoGrid>
				<VideoTitle type="h2" noPadding>Room: {videoCall.publicName}</VideoTitle>
				<MainView>
					{
						activeSpeaker.current ?
							<ActiveParticipantContainer activeSpeaker={activeSpeaker.current} />
						 :
							<VideoEmpty showMessage={participants.length === 0} />
					}

					<VideoMenu
						isAdmin={isAdmin}
						onLeave={onLeave}
						onEndSession={onEndSession}
						muted={muted}
						showParticipants={showParticipants}
						onToggleMute={onToggleMute}
						hideVideo={hideVideo}
						onToggleVideo={onToggleVideo}
						onShareScreen={onShareScreen}
						onShowParticipants={() => {
							setShowParticipants(!showParticipants);
						}}

						onChangeDevice={onChangeDevice}
						audioDeviceId={audioDeviceId}
						videoDeviceId={videoDeviceId}
					/>
				</MainView>
				{
					showParticipants && (
						<Sidebar>
							<div className="local-participant">
								{room ? (
									<ParticipantContainer
										key={room.localParticipant.sid}
										participant={room.localParticipant}
										onSetActiveParticipant={onSetActiveParticipant}
										pinned={activeSpeaker.current?.sid === room.localParticipant.sid}
										muted
									/>
								) :
									''
								}
							</div>
							<div className="remote-participants">{remoteParticipants}</div>
						</Sidebar>
					)
				}
			 </VideoGrid>
		</Box>
	);
};

export default Room;
