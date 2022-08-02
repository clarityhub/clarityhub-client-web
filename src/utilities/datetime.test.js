import { differenceInDays } from './datetime';

const day = 1594515728402;
const oneHourAgo = 1594515728402 - 3600000;
const aLittleLessThanOneDayAgo = 1594515728402 - 24 * 3600000 + 1;
const oneDayAgo = 1594515728402 - 24 * 3600000;
const fortyDaysAgo = 1594515728402 - 40 * 24 * 3600000;

describe('utilities/datetime', () => {
	it('is a function', () => {
		expect(typeof differenceInDays).toBe('function');
	});

	it('returns 0 for a difference of an hour', () => {
		expect(differenceInDays(oneHourAgo, day)).toBe(0);
	});

	it('returns 1 for a difference of a little less than a day ago', () => {
		expect(differenceInDays(aLittleLessThanOneDayAgo, day)).toBe(1);
	});

	it('returns 1 for a difference of a day ago', () => {
		expect(differenceInDays(oneDayAgo, day)).toBe(1);
	});

	it('returns 40 for a difference of forty days ago', () => {
		expect(differenceInDays(fortyDaysAgo, day)).toBe(40);
	});
});
