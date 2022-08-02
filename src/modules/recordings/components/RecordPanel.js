/** @jsx jsx */
import { useCallback, useEffect, useState, Fragment } from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import Card, {
	CardBody,
} from '@clarityhub/unity-web/lib/components/Card';
import ProgressBar from '@clarityhub/unity-web/lib/components/ProgressBar';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Badge from '@clarityhub/unity-web/lib/components/Badge';
import { mdiLoading, mdiMicrophone, mdiStop, mdiDownload, mdiCog } from '@mdi/js';
import Icon from '@mdi/react';

import usePersistentState from 'modules/videoCallApp/utilities/usePersistentState';
import {
	RECORDING_UPLOADED,
	RECORDING_UPLOAD_FAILED,
} from 'modules/recordings/store/constants';

import toStopwatch from '../utilities/stopwatch';
import AudioSettingsModal from './AudioSettingsModal';

const supportsRecording = () => {
	return typeof MediaRecorder !== 'undefined';
};

const RecordButton = styled(Button)`
	padding: 0.6rem;
	border-radius: 50%;
	line-height: 0rem;
`;

RecordButton.defaultProps = {
	type: 'primary',
};

const RecordingButton = ({ isRecording, onStart, onStop, status, onDownload }) => {
	if (status) {
		if (status === RECORDING_UPLOAD_FAILED) {
			return (
				<RecordButton type="danger" onClick={onDownload}>
					<Icon
						path={mdiDownload}
						title="Download"
						color="currentColor"
						size={1}
					/>
				</RecordButton>
			);
		}

		return (
			<RecordButton disabled>
				<Icon
					path={mdiLoading}
					title="Loading"
					color="currentColor"
					size={1}
					spin
				/>
			</RecordButton>
		);
	}

	if (isRecording) {
		return (
			<RecordButton onClick={onStop} type="danger">
				<Icon
					path={mdiStop}
					title="Stop Recording"
					color="currentColor"
					size={1}
				/>
			</RecordButton>
		);
	}

	return (
		<RecordButton onClick={onStart}>
			<Icon
				path={mdiMicrophone}
				title="Record"
				color="currentColor"
				size={1}
			/>
		</RecordButton>
	);
};

const RecordingIndicator = ({ isRecording, status, progress }) => {
	if (status) {
		let type;
		let text;
		switch (status) {
		case RECORDING_UPLOADED:
			text = 'Uploaded!';
			type = 'success';
			break;
		case RECORDING_UPLOAD_FAILED:
			text = 'Upload Failed';
			type = 'danger';
			break;
		default:
			text='Uploading';
			type = 'default';
		}

		return (
			<ProgressBar primary progress={progress} type={type}>
				<Badge type={type}>{text}</Badge>
			</ProgressBar>
		);
	}

	if (isRecording) {
		return <Typography>Recording...</Typography>;
	}

	return <Typography>Not recording</Typography>;
};


const RecordingTime = ({ isRecording, recordingDuration }) => {
	return (
		<Typography>{toStopwatch(recordingDuration)}&nbsp;/&nbsp;2:00:00</Typography>
	);
};

const RecordPanel = ({ isRecording, onStop, onDownload, onStart, status, progress, recordingDuration }) => {
	const [audioDeviceId, setAudioDeviceId] = usePersistentState(null, 'record-audio-panel');
	const [isAudioOpen, setIsAudioOpen] = useState(false);
	const [warnRecordingModal, setWarnRecordingModal] = useState(false);

	const getAudioDevice = useCallback(async () => {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const audioDevices = devices.filter((d) => d.kind === 'audioinput');
			const selectedAudioDevice = devices.find((d) => d.deviceId === audioDeviceId);
			let deviceId = null;

			if (selectedAudioDevice) {
				deviceId = selectedAudioDevice.deviceId;
			} else {
				deviceId = audioDevices[0].deviceId;
			}

			setAudioDeviceId(deviceId);

			return deviceId;
		} catch (e) {
			console.error(e);
			return null;
		}
	}, [audioDeviceId, setAudioDeviceId]);

	useEffect(() => {
		getAudioDevice();
	}, [getAudioDevice]);

	const onChangeDevice = useCallback((id) => {
		setAudioDeviceId(id);
	}, [setAudioDeviceId]);

	const doStart = useCallback(async () => {
		const deviceId = await getAudioDevice();

		onStart({
			deviceId,
		});
	}, [getAudioDevice, onStart]);

	const doCheck = useCallback((result, prompt = true) => {
		switch (result.state) {
		case 'prompt':
		case 'granted':
			doStart();
			break;
		case 'denied':
		default:
			if (prompt) {
				/* eslint-disable-next-line no-alert */
				alert('You need to enable microphone permissions to be able to record');
			}
		}
	}, [doStart]);

	const onStartClick = useCallback(async () => {
		// COMPAT: check if browser supports recording. If not, show modal and return
		if (!supportsRecording()) {
			setWarnRecordingModal(true);
			return;
		}

		// COMPAT: Safari doesn't support navigator.permissions
		if (navigator.permissions) {
			try {
				const result = await navigator.permissions.query({ name: 'microphone' });

				await doCheck(result);

				result.onchange = function onchange(e) {
					// Auto start recording, but don't prompt if we went from permissions granted to permissions denied
					const result = e.target;
					doCheck(result, false);
				};
			} catch (e) {
				// COMPAT: Firefox sometimes doesn't support the query { name: 'microphone' }
				doStart();
			}
		} else {
			// Nothing we can do, just try to start
			doStart();
		}
	}, [doCheck, doStart]);

	const onStopClick = useCallback(() => {
		onStop();
	}, [onStop]);

	return (
		<Fragment>
			<Modal
				open={warnRecordingModal}
				onClose={() => setWarnRecordingModal(false)}
			>
				<CardBody>
					<Typography type="h3">Looks like we can't record</Typography>

					<Typography type="text">Your browser doesn't support audio recording.</Typography>
					<Typography type="text">We currently support audio recording in Mozilla Firefox and Google Chrome.</Typography>

					<Button onClick={() => setWarnRecordingModal(false)}>
						Dismiss
                  	</Button>
				</CardBody>
			</Modal>

			<AudioSettingsModal
				audioDeviceId={audioDeviceId}
				deviceType="audioinput"
				onChangeDevice={onChangeDevice}
				isOpen={isAudioOpen}
				onClose={() => setIsAudioOpen(false)}
			/>

			<Card>
				<CardBody>
					<Box flex={1} direction="row">
						<Box>
							<RecordingButton
								isRecording={isRecording}
								onStart={onStartClick}
								onStop={onStopClick}
								onDownload={onDownload}
								status={status}
							/>
						</Box>
						<Box flex={1} css={css`
							padding: 0 2rem;
							align-self: center;
							justify-self: center;
						`}>
							<RecordingIndicator
								isRecording={isRecording}
								status={status}
								progress={progress}
							/>
						</Box>
						<Box css={css`
							padding: 0 2rem;
							align-self: center;
							justify-self: center;
							width: 8rem;
						`}>
							<RecordingTime
								recordingDuration={recordingDuration}
								isRecording={isRecording}
							/>
						</Box>
						{!isRecording && !status && (
							<Box css={css`
								padding: 0 2rem;
								align-self: center;
								justify-self: center;
								width: 2rem;
							`}>
								<Button text onClick={() => setIsAudioOpen(true)}>
									<Icon
										path={mdiCog}
										title="settings"
										color="currentColor"
										size={1}
										style={{ verticalAlign: 'middle' }}
									/>
								</Button>
							</Box>
						)}
					</Box>
				</CardBody>
			</Card>
		</Fragment>
	);
};

export default RecordPanel;
