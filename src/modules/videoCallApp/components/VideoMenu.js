/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Button from '@clarityhub/unity-web/lib/components/Button';
import ButtonSet from '@clarityhub/unity-web/lib/components/ButtonSet';
import colors from '@clarityhub/unity-core/lib/colors';
import Icon from '@mdi/react';
import {
	mdiMicrophone,
	mdiMicrophoneOff,
	mdiVideo,
	mdiVideoOff,
	mdiAccount,
	mdiAccountOff,
	mdiMonitorShare,
	mdiCog,
	mdiRecordRec
} from '@mdi/js';
import VideoSettingsModal from './VideoSettingsModal';

const VideoMenu = ({
	isAdmin,
	onLeave,
	onEndSession,
	muted,
	showParticipants,
	onToggleMute,
	hideVideo,
	onToggleVideo,
	onShareScreen,
	onShowParticipants,

	videoDeviceId,
	audioDeviceId,
	onChangeDevice,
}) => {
	const [showSettings, setShowSettings] = useState(false);
	const [loadingEndSession, setLoadingEndSession] = useState(false);
	const handleEndSession = async () => {
		setLoadingEndSession(true);
		await onEndSession();
		setLoadingEndSession(false);
	};

	return (
		<Box
			direction="row"
			align="center"
			css={{ height: 60, alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #333', padding: '0 1rem 0 1rem' }}
		>
			<Box direction="row">
				<ButtonSet>
					<Button text type="white" onClick={onToggleMute}>
						{muted ? (
							<Icon
								path={mdiMicrophoneOff}
								title="mute-enabled"
								color="currentColor"
								size={1}
							/>
						) : (
							<Icon
								path={mdiMicrophone}
								title="Search"
								color="currentColor"
								size={1}
							/>
						)}
					</Button>
					<Button text type="white" onClick={onToggleVideo}>
						{hideVideo ? (
							<Icon
								path={mdiVideoOff}
								title="show video"
								color="currentColor"
								size={1}
							/>
						) : (
							<Icon
								path={mdiVideo}
								title="hide video"
								color="currentColor"
								size={1}
							/>
						)}
					</Button>
					<Button text type="white" onClick={onShowParticipants}>
						{showParticipants ? (
							<Icon
								path={mdiAccount}
								title="show participants"
								color="currentColor"
								size={1}
							/>
						) : (
							<Icon
								path={mdiAccountOff}
								title="hide participants"
								color="currentColor"
								size={1}
							/>
						)}
					</Button>
					<Button text type="white" onClick={onShareScreen}>
						<Icon
							path={mdiMonitorShare}
							title="share screen"
							color="currentColor"
							size={1}
						/>
					</Button>
					<Button text type="white" onClick={() => setShowSettings(true)}>
						<Icon
							path={mdiCog}
							title="settings"
							color="currentColor"
							size={1}
						/>
					</Button>
				</ButtonSet>
				<VideoSettingsModal
					videoDeviceId={videoDeviceId}
					audioDeviceId={audioDeviceId}
					onChangeDevice={onChangeDevice}
					isOpen={showSettings}
					onClose={() => setShowSettings(false)}
				/>
				<Box css={{ alignItems: 'center' }}>
					<Button text color="white" disabled>
						<Icon
							path={mdiRecordRec}
							title="recording"
							color={colors.danger.default}
							size={1}
							style={{ verticalAlign: 'top' }}
						/>
						{' '}
						Recording
					</Button>
				</Box>
			</Box>
			<Box direction="row">
				<ButtonSet>
					{isAdmin && (
						<Button type="danger" size="small" onClick={handleEndSession} disabled={loadingEndSession}>
							End Session
						</Button>
					)}
					<Button type="danger" size="small" onClick={onLeave}>
						Leave
					</Button>
				</ButtonSet>
			</Box>
		</Box>
	);
};

export default VideoMenu;
