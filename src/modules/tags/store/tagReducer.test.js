import reducer from './tagReducer';
import {
	GET_ALL_TAGS_LOADING,
	GET_ALL_TAGS_SUCCESS,
	GET_ALL_TAGS_FAILURE,
	GET_TAG_LOADING,
	GET_TAG_SUCCESS,
	GET_TAG_FAILURE,
	CREATE_TAG_LOADING,
	CREATE_TAG_SUCCESS,
	CREATE_TAG_FAILURE,
	UPDATE_TAG_LOADING,
	UPDATE_TAG_SUCCESS,
	UPDATE_TAG_FAILURE,
	DELETE_TAG_LOADING,
	DELETE_TAG_SUCCESS,
	DELETE_TAG_FAILURE,
} from './constants';

describe('Tag reducer', () => {
	describe('default', () => {
		it('is a function', () => {
			expect(typeof reducer).toBe('function');
		});

		it('passes through for unknown action types', () => {
			const before = Symbol();
			const action = {
				type: 'UNKNOWN_ACTION',
			};

			expect(reducer(before, action)).toBe(before);
		});
	});

	describe('load all', () => {
		it('sets loading state', () => {
			const before = {
				isReady: true,
				hasLoadedAll: true,
			};
			const action = {
				type: GET_ALL_TAGS_LOADING,
			};
			const after = {
				isReady: false,
				hasLoadedAll: false,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const item1 = {
				tagPath: '1',
			};

			const before = {
				isReady: false,
				hasLoadedAll: false,
				items: [],
			};
			const action = {
				type: GET_ALL_TAGS_SUCCESS,
				items: [item1],
			};
			const after = {
				isReady: true,
				hasLoadedAll: true,
				items: [item1],
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets error state', () => {
			const error = Symbol();
			const before = {
				isReady: false,
				hasLoadedAll: false,
				items: [],
				error: false,
			};
			const action = {
				type: GET_ALL_TAGS_FAILURE,
				error,
			};
			const after = {
				isReady: false,
				hasLoadedAll: false,
				items: [],
				error,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('get single tag', () => {
		it('sets loading state', () => {
			const before = {
				hasLoadedAll: true,
				isReady: true,
			};
			const action = {
				type: GET_TAG_LOADING,
			};
			const after = {
				hasLoadedAll: true,
				isReady: false,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const item = {
				tagPath: '1',
			};

			const before = {
				hasLoadedAll: true,
				isReady: false,
				items: [],
			};
			const action = {
				type: GET_TAG_SUCCESS,
				item,
			};
			const after = {
				hasLoadedAll: true,
				isReady: true,
				items: [item],
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets error state', () => {
			const error = Symbol();
			const before = {
				items: [],
				error: false,
			};
			const action = {
				type: GET_TAG_FAILURE,
				error,
			};
			const after = {
				items: [],
				error,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('create tag', () => {
		it('sets loading state', () => {
			const before = {
				isCreating: false,
			};
			const action = {
				type: CREATE_TAG_LOADING,
			};
			const after = {
				isCreating: true,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const item1 = {
				tagPath: '1',
			};

			const before = {
				isCreating: true,
				items: [],
			};
			const action = {
				type: CREATE_TAG_SUCCESS,
				item: item1,
			};
			const after = {
				isCreating: false,
				items: [item1],
			};
			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets error state', () => {
			const error = Symbol();
			const before = {
				isCreating: true,
				error: false,
			};
			const action = {
				type: CREATE_TAG_FAILURE,
				error,
			};
			const after = {
				isCreating: false,
				error,
			};
			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('update tag', () => {
		it('sets loading state', () => {
			const before = {
				isPatching: false,
			};
			const action = {
				type: UPDATE_TAG_LOADING,
			};
			const after = {
				isPatching: true,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const itemBefore = {
				tagPath: '1',
				tag: 'Meow',
			};
			const itemAfter = {
				tagPath: '1',
				tag: 'Pepper',
			};

			const before = {
				isPatching: true,
				items: [itemBefore],
			};
			const action = {
				type: UPDATE_TAG_SUCCESS,
				item: itemAfter,
			};
			const after = {
				isPatching: false,
				items: [itemAfter],
			};
			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets error state', () => {
			const error = Symbol();
			const before = {
				isPatching: true,
				error: false,
			};
			const action = {
				type: UPDATE_TAG_FAILURE,
				error,
			};
			const after = {
				isPatching: false,
				error,
			};
			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('delete tag', () => {
		it('sets loading state', () => {
			const before = {
				isPatching: false,
			};
			const action = {
				type: DELETE_TAG_LOADING,
			};
			const after = {
				isPatching: true,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const item1 = {
				tagPath: '1',
				tag: 'Meow',
			};
			const item = {
				tags: [{
					tagPath: '1',
				}],
			};
			const before = {
				isPatching: true,
				items: [item1],
			};
			const action = {
				type: DELETE_TAG_SUCCESS,
				item,
			};
			const after = {
				isPatching: false,
				items: [],
			};
			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets error state', () => {
			const error = Symbol();
			const before = {
				isPatching: true,
			};
			const action = {
				type: DELETE_TAG_FAILURE,
				error,
			};
			const after = {
				isPatching: false,
				error,
			};
			expect(reducer(before, action)).toMatchObject(after);
		});
	});
});
