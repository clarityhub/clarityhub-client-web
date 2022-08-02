import reducer from './reducer';
import * as constants from './constants';

const ITEM = { id: '1' };
const ERROR = Symbol();

describe('workspaces reducer', () => {
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
				errorCurrentWorkspace: false,
			};
			const action = {
				type: constants.GET_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets single success state', () => {
			const before = undefined;
			const after = {
				isReady: true,
				errorCurrentWorkspace: false,
				items: [ITEM],
			};
			const action = {
				type: constants.GET_SUCCESS,
				item: ITEM,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets single failure state', () => {
			const before = undefined;
			const after = {
				isReady: false,
				errorCurrentWorkspace: ERROR,
			};
			const action = {
				type: constants.GET_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('get all', () => {
		/**
         * NOTE Getting all does not modify the ready state
         * since `hasLoadedAll` will let the UI know if all
         * the workspaces have been loaded in
         */
		it('does not modify ready state', () => {
			const before = {
				isReady: true,
			};
			const after = {
				isReady: true,
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
				errorCurrentWorkspace: false,
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
				errorCurrentWorkspace: false,
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
				type: constants.CREATE_WORKSPACE_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets create success state', () => {
			const before = undefined;
			const after = {
				isCreating: false,
			};
			const action = {
				type: constants.CREATE_WORKSPACE_SUCCESS,
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
				type: constants.CREATE_WORKSPACE_FAILURE,
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
				type: constants.UPDATE_WORKSPACE_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets update success state', () => {
			const before = undefined;
			const after = {
				isPatching: false,
			};
			const action = {
				type: constants.UPDATE_WORKSPACE_SUCCESS,
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
				type: constants.UPDATE_WORKSPACE_FAILURE,
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
				type: constants.DELETE_WORKSPACE_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets delete success state', () => {
			const before = undefined;
			const after = {
				isPatching: false,
			};
			const action = {
				type: constants.DELETE_WORKSPACE_SUCCESS,
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
				type: constants.DELETE_WORKSPACE_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});
});
