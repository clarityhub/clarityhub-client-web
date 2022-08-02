import { openRightPane, closeRightPane, resetRightPane, openLeftPane, closeLeftPane } from './actions';

describe('app store actions', () => {
	describe('optionRightPane', () => {
		it('is a function', () => {
			expect(typeof openRightPane).toBe('function');
		});

		it('is an action creator', () => {
			expect(typeof openRightPane()).toBe('object');
		});
	});

	describe('closeRightPane', () => {
		it('is a function', () => {
			expect(typeof closeRightPane).toBe('function');
		});

		it('is an action creator', () => {
			expect(typeof closeRightPane()).toBe('object');
		});
	});

	describe('resetRightPane', () => {
		it('is a function', () => {
			expect(typeof resetRightPane).toBe('function');
		});

		it('is an action creator', () => {
			expect(typeof resetRightPane()).toBe('object');
		});
	});

	describe('openLeftPane', () => {
		it('is a function', () => {
			expect(typeof openLeftPane).toBe('function');
		});

		it('is an action creator', () => {
			expect(typeof openLeftPane()).toBe('object');
		});
	});

	describe('closeLeftPane', () => {
		it('is a function', () => {
			expect(typeof closeLeftPane).toBe('function');
		});

		it('is an action creator', () => {
			expect(typeof closeLeftPane()).toBe('object');
		});
	});
});
