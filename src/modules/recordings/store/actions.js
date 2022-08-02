import { UPDATE_MEDIA_SUCCESS } from 'modules/medias/store/constants';
import download from 'utilities/download';
import {
	RECORDING_START,
	RECORDING_STOPPED,
	RECORDING_FINALIZING,
	RECORDING_UPLOADING,
	RECORDING_UPLOADED,
	RECORDING_UPLOAD_FAILED,
	RECORDING_RESET,
	RECORDING_UPDATE_TIMER,
} from './constants';

let _interval = null;

const TWO_HOURS = 1000 * 60 * 60 * 2;

const startTimer = (startTime) => (dispatch) => {
	_interval = setInterval(() => {
		const duration = new Date().valueOf() - startTime;
		dispatch(updateTimer(duration));

		if (duration > TWO_HOURS) {
			dispatch(stopRecording());
		}
	}, 100);
};

const stopTimer = () => () => {
	clearInterval(_interval);
};

export const resetRecording = () => (dispatch, getState, { services }) => {
	services.recorder.stop();

	dispatch({
		type: RECORDING_RESET,
	});
};

export const startRecording = ({ referencePath, mediaId, deviceId }) => async (dispatch, getState, { services }) => {
	// Do not start recording if we are already recording
	if (services.recorder.isRecording) {
		return;
	}

	await services.recorder.start({
		uuid: mediaId,
		deviceId,
		onError: (error) => dispatch(errorRecording(mediaId, error)),
		onComplete: (blob) => dispatch(sendRecording(mediaId, blob)),
	});

	dispatch(startTimer(new Date().valueOf()));

	dispatch({
		type: RECORDING_START,
		uuid: mediaId,
		referencePath,
	});
};

export const downloadRecording = ({ filename, fileType }) => (dispatch, getState, { services }) => {
	const url = URL.createObjectURL(new Blob([services.recorder.lastRecording], { type: fileType }));

	download(url, filename || 'recording.wav');
};

export const sendRecording = (mediaId, blob) => async (dispatch, getState, { services }) => {
	// At this point buffer is an array of Buffers
	dispatch({
		type: RECORDING_FINALIZING,
		uuid: mediaId,
	});

	try {
		const media = await services.api.medias.getUploadUrl(mediaId);

		dispatch({
			type: RECORDING_UPLOADING,
			uuid: mediaId,
			progress: 0,
		});

		const { presignedUrl, filename, fileType } = media;

		await services.api.medias.upload(presignedUrl, blob, filename, fileType, {
			onProgress: (progress) => {
				dispatch({
					type: RECORDING_UPLOADING,
					uuid: mediaId,
					progress,
				});
			},
		});


		const newMedia = await services.api.medias.complete(mediaId);

		// TODO dispatch an action from media instead of calling the constant directly
		dispatch({
			type: UPDATE_MEDIA_SUCCESS,
			item: newMedia,
		});

		dispatch({
			type: RECORDING_UPLOADED,
		});
	} catch (e) {
		dispatch({
			type: RECORDING_UPLOAD_FAILED,
			error: e,
		});
	}
};

export const errorRecording = (uuid, error) => {
	// TODO
};

export const stopRecording = () => (dispatch, getState, { services }) => {
	// const id = getState().recordings.currentMediaId;
	// services.uploader.completeUpload(id);
	services.recorder.stop();

	dispatch(stopTimer());

	dispatch({
		type: RECORDING_STOPPED,
	});
};

export const updateTimer = (recordingDuration) => {
	return {
		type: RECORDING_UPDATE_TIMER,
		recordingDuration,
	};
};
