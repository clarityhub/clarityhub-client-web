import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
	startRecording,
	stopRecording,
	downloadRecording,
	resetRecording,
} from '../store/actions';

import RecordPanel from '../components/RecordPanel';
import { RECORDING_UPLOAD_FAILED } from '../store/constants';

const RecordPanelContainer = ({
	media,
	referencePath,
	mediaId,
	isRecording,
	status,
	progress,
	recordingDuration,
	startRecording,
	stopRecording,
	downloadRecording,
	resetRecording,
	dontResetRecording,
}) => {
	const [hasReset] = useState(false);
	const [stuck, setStuck] = useState(false);
	const [stickyStatus, setStickyStatus] = useState(() => status);
	const [stickyProgress, setStickyProgress] = useState(() => progress);

	useEffect(() => {
		if (!dontResetRecording && status === RECORDING_UPLOAD_FAILED) {
			resetRecording();
		}
	}, [dontResetRecording, resetRecording, status]);

	useEffect(() => {
		if (status === RECORDING_UPLOAD_FAILED && hasReset) {
			setStuck(true);
			// Purposefully going to setStickyStatus after our initial setStuck(true)
		}

		if (!stuck) {
			setStickyStatus(status);
			setStickyProgress(progress);
		}
	}, [hasReset, progress, status, stuck]);

	const onStart = useCallback(({ deviceId }) => {
		return startRecording({ referencePath, mediaId, deviceId });
	}, [referencePath, mediaId, startRecording]);

	const onStop = useCallback(() => {
		return stopRecording();
	}, [stopRecording]);

	const onDownload = useCallback(() => {
		return downloadRecording({
			filename: media && media.filename,
			fileType: media.fileType,
		});
	}, [downloadRecording, media]);

	return (
		<RecordPanel
			isRecording={isRecording}
			status={stickyStatus}
			progress={stickyProgress}
			recordingDuration={recordingDuration}

			onStart={onStart}
			onStop={onStop}
			onDownload={onDownload}
		/>
	);
};

const mapStateToProps = (state, props) => {
	return {
		media: state.medias.items.find(item => item.id === props.mediaId),
		isRecording: state.recordings.isRecording,
		recordingDuration: state.recordings.recordingDuration,
		status: state.recordings.status,
		progress: state.recordings.progress,
	};
};

const mapDispatchToProps = {
	startRecording,
	stopRecording,
	downloadRecording,
	resetRecording,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordPanelContainer);
