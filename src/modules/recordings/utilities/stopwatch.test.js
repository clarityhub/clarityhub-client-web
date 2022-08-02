import toStopwatch from './stopwatch';

describe('toStopwatch', () => {
	it('correctly returns the correct hh:mm:ss format', () => {
		const set = [
			/* given, expected */
			[1000 * 60 * 60, '1:00:00'],
			[1000 * 61 * 60, '1:01:00'],
			[1000 * 2, '0:02'],
			[500, '0:00'],
			[143728461, '39:55:28'],
		];

		set.forEach(([given, expected]) => {
			expect(toStopwatch(given)).toBe(expected);
		});
	});
});
