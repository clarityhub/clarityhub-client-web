import pickColor, { colors } from './pickColor';

describe('pickColor', () => {
	describe('colors', () => {
		it('is an array', () => {
			expect(Array.isArray(colors)).toBe(true);
		});
	});

	describe('pickColor', () => {
		it('is a function', () => {
			expect(typeof pickColor).toBe('function');
		});

		it('returns colors for strings', () => {
			const tests = [
				/* input, output */
				['Status', 'C7F9C9'],
				['test', 'C7F9EF'],
			];

			tests.forEach(([given, expected]) => {
				expect(pickColor(given)).toBe(expected);
			});
		});
	});
});
