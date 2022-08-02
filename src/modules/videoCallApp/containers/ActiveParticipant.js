/** @jsx jsx */
import { useRef } from 'react';
import { jsx } from '@emotion/core';
import ActiveParticipant from '../components/ActiveParticipant';
import useParticipant from '../utilities/useParticipant';

const ActiveParticipantContainer = ({ activeSpeaker: participant }) => {
	const videoRef = useRef();
	const audioRef = useRef();

	const { selfMuted, hideVideo } = useParticipant({
		participant,
		videoRef,
		audioRef,
	});

	const identity = JSON.parse(participant.identity);

	return (
		<ActiveParticipant
			videoRef={videoRef}
			audioRef={audioRef}
			identity={identity}
			selfMuted={selfMuted}
			hideVideo={hideVideo}
		/>
	);
};

export default ActiveParticipantContainer;
