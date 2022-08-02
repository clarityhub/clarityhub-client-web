import {
	GET_BILLING_FAILURE,
	GET_BILLING_LOADING,
	GET_BILLING_SUCCESS,
} from '../../billing/store/constants';
import reducer from './planItemsReducer';

const DATA = Symbol();

describe('plans/store/planItemsReducer', () => {
	it('updates with billing loading', () => {
		const before = undefined;
		const action = {
			type: GET_BILLING_LOADING,
		};
		const after = {
			status: 'loading',
		};

		expect(reducer(before, action)).toEqual(
			expect.objectContaining(after),
		);
	});

	it('updates with billing succcess', () => {
		const before = undefined;
		const action = {
			type: GET_BILLING_SUCCESS,
			plans: {
				data: DATA,
			},
		};
		const after = {
			status: 'ready',
			data: DATA,
		};

		expect(reducer(before, action)).toEqual(
			expect.objectContaining(after),
		);
	});

	it('updates with billing failure', () => {
		const before = undefined;
		const action = {
			type: GET_BILLING_FAILURE,
		};
		const after = {
			status: 'error',
		};

		expect(reducer(before, action)).toEqual(
			expect.objectContaining(after),
		);
	});
});
