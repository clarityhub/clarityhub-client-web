import sortNewestToOldest from './sortNewestToOldest';

describe('utilities sortNewestToOldest', () => {
	it('is a function', () => {
		expect(typeof sortNewestToOldest).toBe('function');
	});

	it('sorts elements by newest to oldest', () => {
		const items = [
			{ createdAt: '2020-07-13T03:27:36.343Z' },
			{ createdAt: '2020-10-13T03:27:36.343Z' },
			{ createdAt: '2020-07-01T03:27:36.343Z' },
			{ createdAt: '2018-01-01T03:27:36.343Z' },
		];

		const sorted = sortNewestToOldest(items);

		expect(sorted[0].createdAt).toBe('2020-10-13T03:27:36.343Z');
		expect(sorted[1].createdAt).toBe('2020-07-13T03:27:36.343Z');
		expect(sorted[2].createdAt).toBe('2020-07-01T03:27:36.343Z');
		expect(sorted[3].createdAt).toBe('2018-01-01T03:27:36.343Z');

	});
});
