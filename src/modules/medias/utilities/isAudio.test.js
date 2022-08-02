import isAudio from './isAudio';

describe('medias/isAudio', () => {
	it('detects isAudio from file type', () => {
		expect(isAudio('audio')).toBeTruthy();
		expect(isAudio('audio/mp3')).toBeTruthy();
		expect(isAudio('audio/wav')).toBeTruthy();
		expect(isAudio('audio/aac')).toBeTruthy();
		expect(isAudio('audio/mpeg')).toBeTruthy();


		expect(isAudio('text/plain')).toBeFalsy();
		expect(isAudio('application/json')).toBeFalsy();
		expect(isAudio('video/mpeg')).toBeFalsy();
		expect(isAudio('video/quicktime')).toBeFalsy();
	});
});
