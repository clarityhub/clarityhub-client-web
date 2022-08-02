/** @jsx jsx */
import { useRef } from 'react';
import { jsx } from '@emotion/core';
import Participant from '../components/Participant';
import useParticipant from '../utilities/useParticipant';

const ParticipantContainer = ({ participant, onSetActiveParticipant, pinned, muted }) => {
	const videoRef = useRef();
	const audioRef = useRef();

	const { muted: selfMuted, hideVideo } = useParticipant({
		participant,
		videoRef,
		audioRef,
	});

	const identity = JSON.parse(participant.identity);

	return (
		<Participant
			identity={identity}
			onSetActiveParticipant={onSetActiveParticipant}
			participant={participant}
			pinned={pinned}
			muted={muted}
			videoRef={videoRef}
			audioRef={audioRef}
			selfMuted={selfMuted}
			hideVideo={hideVideo}
		/>
	);
};

export default ParticipantContainer;
