import generateFileName from 'modules/recordings/utilities/generateFileName';

export interface AudioRecordingDetailsOptions {
	fileType?: string,
	filename?: string
}

export default function createAudioRecordingDetails(options: AudioRecordingDetailsOptions = {}) {
	return {
		action: 'transcribe',
		status: 'recording',
		fileType: options.fileType || 'audio/wav',
		filename: options.filename || generateFileName(),
	};
}
