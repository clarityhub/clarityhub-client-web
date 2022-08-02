import {
	USAGE_GET_ALL_LOADING,
	USAGE_GET_ALL_SUCCESS,
	USAGE_GET_ALL_FAILURE,
} from './constants';
import reducer from './planUsageReducer';

const ERROR = Symbol();

describe('plans/store/planUsageReducer', () => {
	it('updates with usage loading', () => {
		const before = undefined;
		const action = {
			type: USAGE_GET_ALL_LOADING,
		};
		const after = {
			isReady: false,
			error: false,
			hasLoadedAll: false,
		};

		expect(reducer(before, action)).toEqual(
			expect.objectContaining(after),
		);
	});

	it('updates with usage succcess', () => {
		const before = undefined;
		const action = {
			type: USAGE_GET_ALL_SUCCESS,
			items: {
				usage: 'usage',
				planLimits: 'planLimits',
			},
		};
		const after = {
			isReady: true,
			error: false,
			usage: 'usage',
			plans: 'planLimits',
			hasLoadedAll: true,
		};

		expect(reducer(before, action)).toEqual(
			expect.objectContaining(after),
		);
	});

	it('updates with usage failure', () => {
		const before = undefined;
		const action = {
			type: USAGE_GET_ALL_FAILURE,
			error: ERROR,
		};
		const after = {
			error: ERROR,
			isReady: false,
			hasLoadedAll: false,
		};

		expect(reducer(before, action)).toEqual(
			expect.objectContaining(after),
		);
	});
});
