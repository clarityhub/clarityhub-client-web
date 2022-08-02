import {
	GET_TAG_ITEMS_LOADING,
	GET_TAG_ITEMS_SUCCESS,
	GET_TAG_ITEMS_FAILURE,
	CREATE_TAG_ITEM_LOADING,
	CREATE_TAG_ITEM_SUCCESS,
	CREATE_TAG_ITEM_FAILURE,
	DELETE_TAG_ITEM_LOADING,
	DELETE_TAG_ITEM_SUCCESS,
	DELETE_TAG_ITEM_FAILURE,
	GET_TAG_ITEMS_PARTIAL,
} from './constants';
import reducer from './tagItemReducer';

const ITEM_1 = {
	workspaceId: '1',
	itemTagPath: 'interview:1:1234:asdf',
	tagPathItem: '1234:asdf:interview:1',
	itemId: '1',
	itemType: 'interview',
	tagPath: '1234:asdf',
	itemPreview: 'Test',
};
const ITEM_2 = {
	workspaceId: '1',
	itemTagPath: 'interview:1:1234:qwer',
	tagPathItem: '1234:qwer:interview:1',
	itemId: '1',
	itemType: 'interview',
	tagPath: '1234:qwer',
	itemPreview: 'Test',
};

describe('TagItem reducer', () => {
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

	describe('get all tag items by item', () => {
		it('sets loading state', () => {
			const before = undefined;
			const action = {
				type: GET_TAG_ITEMS_LOADING,
				request: {
					type: 'interview',
					itemId: '1',
				},
			};
			const after = {
				items: {
					'interview:1': {
						isReady: false,
						error: false,
						items: [],
					},
				},
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const before = {
				items: {
					'interview:1': {
						isReady: false,
						items: [],
					},
				},
			};
			const action = {
				type: GET_TAG_ITEMS_SUCCESS,
				request: {
					type: 'interview',
					itemId: '1',
				},
				items: [ITEM_1, ITEM_2],
			};
			const after = {
				items: {
					'interview:1': {
						isReady: true,
						items: [ITEM_1, ITEM_2],
					},
				},
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets failure state', () => {
			const error = Symbol();
			const before = {
				items: {
					'interview:1': {
						isReady: false,
						items: [],
					},
				},
			};
			const action = {
				type: GET_TAG_ITEMS_FAILURE,
				request: {
					type: 'interview',
					itemId: '1',
				},
				error,
			};
			const after = {
				items: {
					'interview:1': {
						isReady: false,
						error,
					},
				},
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('create tag item', () => {
		it('sets loading state', () => {
			const before = undefined;
			const action = {
				type: CREATE_TAG_ITEM_LOADING,
			};
			const after = {
				items: {},
				isCreating: true,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const before = {
				items: {},
				isCreating: true,
			};
			const action = {
				type: CREATE_TAG_ITEM_SUCCESS,
				item: ITEM_1,
			};
			const after = {
				items: {
					'interview:1': {
						items: [ITEM_1],
						isReady: true,
						error: false,
					},
				},
				isCreating: false,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets failure state', () => {
			const error = Symbol();
			const before = {
				items: {},
				isCreating: true,
			};
			const action = {
				type: CREATE_TAG_ITEM_FAILURE,
				error,
			};
			const after = {
				items: {},
				isCreating: false,
				error,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('delete tag item', () => {
		it('sets loading state', () => {
			const before = {
				items: {
					'interview:1': {
						items: [ITEM_1],
						isReady: true,
						error: false,
					},
				},
				isPatching: false,
			};
			const action = {
				type: DELETE_TAG_ITEM_LOADING,
			};
			const after = {
				items: {
					'interview:1': {
						items: [ITEM_1],
						isReady: true,
						error: false,
					},
				},
				isPatching: true,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const before = {
				items: {
					'interview:1': {
						items: [ITEM_1],
						isReady: true,
						error: false,
					},
				},
				isPatching: false,
			};
			const action = {
				type: DELETE_TAG_ITEM_SUCCESS,
				item: ITEM_1,
			};
			const after = {
				items: {
					'interview:1': {
						items: [],
						isReady: true,
						error: false,
					},
				},
				isPatching: false,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets failure state', () => {
			const error = Symbol();
			const before = {
				items: {
					'interview:1': {
						items: [ITEM_1],
						isReady: true,
						error: false,
					},
				},
				isPatching: false,
			};
			const action = {
				type: DELETE_TAG_ITEM_FAILURE,
				error,
			};
			const after = {
				items: {
					'interview:1': {
						items: [ITEM_1],
						isReady: true,
						error: false,
					},
				},
				error,
				isPatching: false,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('a partial load', () => {
		it('sets success state', () => {
			const before = {
				items: {
					'interview:1': {
						isReady: false,
						items: [],
					},
				},
			};
			const action = {
				type: GET_TAG_ITEMS_PARTIAL,
				items: [[ITEM_1, ITEM_2]],
			};
			const after = {
				items: {
					'interview:1': {
						isReady: true,
						items: [ITEM_1, ITEM_2],
					},
				},
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});
});
