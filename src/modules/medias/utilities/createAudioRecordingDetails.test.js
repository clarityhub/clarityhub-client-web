import createAudioRecordingDetails from './createAudioRecordingDetails';

describe('medias/utilities/createAudioRecordingDetails', () => {
	it('is a function', () => {
		expect(typeof createAudioRecordingDetails).toBe('function');
	});

	it('generates recording data', () => {
		const data = createAudioRecordingDetails();
		expect(data).toEqual(
			expect.objectContaining({
				status: 'recording',
				action: 'transcribe',
				fileType: 'audio/wav',
			}),
		);

		expect(data.filename).toBeTruthy();
	});

	it('allows overrides', () => {
		const data = createAudioRecordingDetails({
			fileType: 'audio/mp3',
			filename: 'greg.mp3',
		});
		expect(data).toEqual(
			expect.objectContaining({
				status: 'recording',
				action: 'transcribe',
				fileType: 'audio/mp3',
				filename: 'greg.mp3',
			}),
		);
	});
});
