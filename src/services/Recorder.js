import RecordRTC from 'recordrtc';
import toWav from 'audiobuffer-to-wav';

class Recorder {
	constructor() {
		this.stream = null;
		this.context = null;
		this.source = null;
		this.lastRecording = null;
		this.lastBlob = null;
		this.isRecording = false;

		this.buffer = [];
	}

	async start({
		deviceId,
		onComplete,
		onError,
	}) {
		this.isRecording = true;
		this.onComplete = onComplete;
		this.onError = onError;

		this.stream = await navigator.mediaDevices.getUserMedia({
			audio: {
				deviceId,
			},
			echoCancellation: true,
		});

		const options = {
			type: 'audio',
			mimeType: 'audio/webm',
			sampleRate: 16000,
		};

		this.recorder = new RecordRTC.RecordRTCPromisesHandler(this.stream, options);

		this.recorder.startRecording();
	}

	async stop() {
		this.isRecording = false;
		if (this.recorder) {
			await this.recorder.stopRecording();

			const blob = await this.recorder.getBlob();
			let fileReader = new FileReader();
			let arrayBuffer;

			/* eslint-disable-next-line require-atomic-updates */
			fileReader.onloadend = async () => {
				arrayBuffer = fileReader.result;

				const audioContext = new AudioContext();

				const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

				this.lastRecording = toWav(audioBuffer);

				if (this.onComplete) {
					this.onComplete(this.lastRecording);
				}

				this.close();
			};

			fileReader.readAsArrayBuffer(blob);
		}
	}

	close() {
		this.stream.getTracks().forEach(function stopTrack(track) {
			track.stop();
		});

		this.stream = null;
		this.recorder = null;
	}
}

export default function createRec() {
	return new Recorder();
}
