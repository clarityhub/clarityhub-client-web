/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { mdiPin } from '@mdi/js';
import Icon from '@mdi/react';
import colors from '@clarityhub/unity-core/lib/colors';
import VideoLabel from './VideoLabel';

const Participant = ({ participant, onSetActiveParticipant, identity, pinned, muted = false, videoRef, audioRef, selfMuted, hideVideo }) => {
	return (
		<div className="participant" css={{ position: 'relative' }}>
			<VideoLabel>
				{identity.name}
				{selfMuted ? ' 🔇' : ''}
			</VideoLabel>
			<button
				css={css`
					position: absolute;
					top: 4px;
					right: 4px;
					z-index: 3;
				`}
				onClick={() => onSetActiveParticipant(pinned ? null : participant)}
			>
				<Icon
					path={mdiPin}
					title="pin video"
					color={pinned ? colors.notification.default: 'currentColor'}
					size={1}
				/>
			</button>
			<video ref={videoRef} autoPlay={true} css={{ width: '100%', pointerEvents: 'none' }} />
			<audio ref={audioRef} autoPlay={true} muted={muted} />
		</div>
	);
};

export default Participant;
