import capitalize from './capitalize';

describe('utilities/capitalize', () => {
	it('is a function', () => {
		expect(typeof capitalize).toBe('function');
	});

	it('returns an empty string for non-strings', () => {
		expect(capitalize({})).toBe('');
	});

	it('returns a capitalized string', () => {
		expect(capitalize('fred')).toBe('Fred');
		expect(capitalize('Fred')).toBe('Fred');
		expect(capitalize(' fred')).toBe(' fred');
	});
});
