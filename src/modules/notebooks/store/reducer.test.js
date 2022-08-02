import reducer from './reducer';
import * as constants from './constants';

const ITEM = { id: '1' };
const ERROR = Symbol();

describe('notebook reducer', () => {
	it('is a function', () => {
		expect(typeof reducer).toBe('function');
	});

	it('passes through unknown action type', () => {
		const state = Symbol();
		const action = {
			type: 'UNKNOWN',
		};

		expect(reducer(state, action)).toBe(state);
	});

	describe('get', () => {
		it('sets single loading state', () => {
			const before = undefined;
			const after = {
				isReady: false,
			};
			const action = {
				type: constants.GET_NOTEBOOK_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets single success state', () => {
			const before = undefined;
			const after = {
				isReady: true,
				items: [ITEM],

			};
			const action = {
				type: constants.GET_NOTEBOOK_SUCCESS,
				item: ITEM,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets single failure state', () => {
			const before = undefined;
			const after = {
				isReady: true,
				error: ERROR,
			};
			const action = {
				type: constants.GET_NOTEBOOK_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('getAll', () => {
		it('sets loading state', () => {
			const before = undefined;
			const after = {
				isReady: false,
				hasLoadedAll: false,
			};
			const action = {
				type: constants.GET_ALL_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets all success state', () => {
			const before = undefined;
			const after = {
				isReady: true,
				hasLoadedAll: true,
				items: [ITEM],
			};
			const action = {
				type: constants.GET_ALL_SUCCESS,
				items: [ITEM],
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets all failure state', () => {
			const before = undefined;
			const after = {
				isReady: false,
				error: ERROR,
			};
			const action = {
				type: constants.GET_ALL_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('create', () => {
		it('sets create loading state', () => {
			const before = undefined;
			const after = {
				isCreating: true,
			};
			const action = {
				type: constants.CREATE_NOTEBOOK_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets create success state', () => {
			const before = undefined;
			const after = {
				isCreating: false,
			};
			const action = {
				type: constants.CREATE_NOTEBOOK_SUCCESS,
				item: ITEM,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets create failure state', () => {
			const before = undefined;
			const after = {
				isCreating: false,
				error: ERROR,
			};
			const action = {
				type: constants.CREATE_NOTEBOOK_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('update', () => {
		it('sets update loading state', () => {
			const before = undefined;
			const after = {
				isPatching: true,
			};
			const action = {
				type: constants.UPDATE_NOTEBOOK_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets update success state', () => {
			const before = undefined;
			const after = {
				isPatching: false,
			};
			const action = {
				type: constants.UPDATE_NOTEBOOK_SUCCESS,
				item: ITEM,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets update failure state', () => {
			const before = undefined;
			const after = {
				isPatching: false,
				error: ERROR,
			};
			const action = {
				type: constants.UPDATE_NOTEBOOK_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('delete', () => {
		it('sets delete loading state', () => {
			const before = undefined;
			const after = {
				isPatching: true,
			};
			const action = {
				type: constants.DELETE_NOTEBOOK_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets delete success state', () => {
			const before = undefined;
			const after = {
				isPatching: false,
			};
			const action = {
				type: constants.DELETE_NOTEBOOK_SUCCESS,
				item: ITEM,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets delete failure state', () => {
			const before = undefined;
			const after = {
				isPatching: false,
				error: ERROR,
			};
			const action = {
				type: constants.DELETE_NOTEBOOK_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('set current notebook', () => {
		it('sets current notebook', () => {
			const before = undefined;
			const after = {
				currentNotebook: ITEM.id,
			};
			const action = {
				type: constants.SET_CURRENT_NOTEBOOK,
				item: ITEM,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});
});
