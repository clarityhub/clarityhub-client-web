/** @jsx jsx */
import { jsx } from '@emotion/core';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import VideoLabel from './VideoLabel';

const ActiveParticipant = ({ videoRef, audioRef, identity, selfMuted, hideVideo }) => {
	return (
		<Box flex={1} css={{ height: 'calc(100% - 60px)', position: 'relative' }}>
			<VideoLabel>{identity.name}{selfMuted ? ' 🔇' : ''}</VideoLabel>
			<video ref={videoRef} autoPlay={true} css={{ width: '100%' }} />
			<audio ref={audioRef} autoPlay={true} muted={true} />
		</Box>
	);
};

export default ActiveParticipant;
