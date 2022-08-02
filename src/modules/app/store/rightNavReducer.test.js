import { OPEN_RIGHT_PANE, CLOSE_RIGHT_PANE, RESET_RIGHT_PANE } from './constants';
import reducer from './rightNavReducer';

describe('app store rightNavReducer', () => {
	it('handles open right pane action', () => {
		const before = undefined;
		const action = {
			type: OPEN_RIGHT_PANE,
			when: 'when',
			view: 'type',
		};
		const after = {
			isOpen: true,
			when: 'when',
			view: 'type',
		};

		expect(reducer(before, action)).toEqual(
			expect.objectContaining(after),
		);
	});

	it('handles close right pane action', () => {
		const before = undefined;
		const action = {
			type: CLOSE_RIGHT_PANE,
		};
		const after = {
			isOpen: false,
		};

		expect(reducer(before, action)).toEqual(
			expect.objectContaining(after),
		);
	});

	it('handles reset action', () => {
		const before = undefined;
		const action = {
			type: RESET_RIGHT_PANE,
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
