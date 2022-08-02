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

const initialState = {
	status: null,
	isRecording: false,
	currentMediaId: -1,
	referencePath: -1,
	progress: 0,
	recordingDuration: 0,
};

export default (state = initialState, action = {}) => {
	switch (action.type) {
	case RECORDING_RESET:
		return initialState;

	case RECORDING_START:
		return {
			...state,
			status: null,
			progress: 0,
			recordingDuration: 0,
			isRecording: true,
			currentMediaId: action.uuid,
			referencePath: action.referencePath,
		};
	case RECORDING_STOPPED:
		return {
			...state,
			isRecording: false,
			currentMediaId: -1,
		};
	case RECORDING_FINALIZING:
		return {
			...state,
			status: action.type,
		};
	case RECORDING_UPLOADED:
		return initialState;
	case RECORDING_UPLOAD_FAILED:
		return {
			...state,
			status: action.type,
		};
	case RECORDING_UPLOADING:
		return {
			...state,
			status: action.type,
			progress: action.progress,
		};
	case RECORDING_UPDATE_TIMER:
		return {
			...state,
			recordingDuration: action.recordingDuration,
		};
	default:
		return state;
	}
};
