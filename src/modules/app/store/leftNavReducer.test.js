import { OPEN_LEFT_PANE, CLOSE_LEFT_PANE } from './constants';
import reducer from './leftNavReducer';

describe('app store leftNavReducer', () => {
	it('handles open left pane action', () => {
		const before = undefined;
		const action = {
			type: OPEN_LEFT_PANE,
		};
		const after = {
			isOpen: true,
		};

		expect(reducer(before, action)).toEqual(
			expect.objectContaining(after),
		);
	});

	it('handles close left pane action', () => {
		const before = undefined;
		const action = {
			type: CLOSE_LEFT_PANE,
		};
		const after = {
			isOpen: false,
		};

		expect(reducer(before, action)).toEqual(
			expect.objectContaining(after),
		);
	});

	it('passes through unknown action', () => {
		const before = {
			isOpen: true,
		};
		const action = {
			type: 'unknown action',
		};
		const after = {
			isOpen: true,
		};

		expect(reducer(before, action)).toEqual(
			expect.objectContaining(after),
		);
	});
});
