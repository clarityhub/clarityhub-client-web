import reducer from './reducer';
import {
	GET_VIDEO_CALL_LOADING,
	GET_VIDEO_CALL_SUCCESS,
	GET_VIDEO_CALL_FAILURE,
	CREATE_VIDEO_CALL_LOADING,
	CREATE_VIDEO_CALL_SUCCESS,
	CREATE_VIDEO_CALL_FAILURE,
	UPDATE_VIDEO_CALL_LOADING,
	UPDATE_VIDEO_CALL_SUCCESS,
	UPDATE_VIDEO_CALL_FAILURE,
	DELETE_VIDEO_CALL_LOADING,
	DELETE_VIDEO_CALL_SUCCESS,
	DELETE_VIDEO_CALL_FAILURE,
} from './constants';

const ITEM = {
	id: Symbol(),
};
const ERROR = Symbol();

describe('videoCall reducer', () => {
	it('is a function', () => {
		expect(typeof reducer).toBe('function');
	});

	it('has a default', () => {
		const action = {
			type: 'UNKNOWN',
		};
		const before = undefined;
		const after = {
			items: [],
			error: false,
		};
		expect(reducer(before, action)).toStrictEqual(after);
	});

	it('passes through', () => {
		const action = {
			type: 'UNKNOWN',
		};
		const before = {
			items: [ITEM],
			error: ERROR,
		};
		const after = {
			items: [ITEM],
			error: ERROR,
		};
		expect(reducer(before, action)).toStrictEqual(after);
	});

	describe('get video call', () => {
		it('sets loading state', () => {
			const action = {
				type: GET_VIDEO_CALL_LOADING,
			};
			const before = {
				items: [],
				error: true,
			};
			const after = {
				items: [],
				error: false,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});

		it('sets success state', () => {
			const action = {
				type: GET_VIDEO_CALL_SUCCESS,
				item: ITEM,
			};
			const before = {
				items: [],
				error: true,
			};
			const after = {
				items: [ITEM],
				error: false,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});

		it('sets failure state', () => {
			const action = {
				type: GET_VIDEO_CALL_FAILURE,
				error: ERROR,
			};
			const before = {
				items: [],
				error: false,
			};
			const after = {
				items: [],
				error: ERROR,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});
	});

	describe('create video call', () => {
		it('sets loading state', () => {
			const action = {
				type: CREATE_VIDEO_CALL_LOADING,
				error: ERROR,
			};
			const before = {
				items: [],
				error: true,
			};
			const after = {
				items: [],
				error: false,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});

		it('sets success state', () => {
			const action = {
				type: CREATE_VIDEO_CALL_SUCCESS,
				item: ITEM,
			};
			const before = {
				items: [],
				error: true,
			};
			const after = {
				items: [ITEM],
				error: false,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});

		it('sets failure state', () => {
			const action = {
				type: CREATE_VIDEO_CALL_FAILURE,
				error: ERROR,
			};
			const before = {
				items: [],
				error: false,
			};
			const after = {
				items: [],
				error: ERROR,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});
	});

	describe('update video call', () => {
		it('sets loading state', () => {
			const action = {
				type: UPDATE_VIDEO_CALL_LOADING,
				error: ERROR,
			};
			const before = {
				items: [ITEM],
				error: true,
			};
			const after = {
				items: [ITEM],
				error: false,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});

		it('sets success state', () => {
			const action = {
				type: UPDATE_VIDEO_CALL_SUCCESS,
				item: ITEM,
			};
			const before = {
				items: [ITEM],
				error: true,
			};
			const after = {
				items: [ITEM],
				error: false,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});

		it('sets failure state', () => {
			const action = {
				type: UPDATE_VIDEO_CALL_FAILURE,
				error: ERROR,
			};
			const before = {
				items: [ITEM],
				error: false,
			};
			const after = {
				items: [ITEM],
				error: ERROR,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});
	});

	describe('delete video call', () => {
		it('sets loading state', () => {
			const action = {
				type: DELETE_VIDEO_CALL_LOADING,
				error: ERROR,
			};
			const before = {
				items: [ITEM],
				error: true,
			};
			const after = {
				items: [ITEM],
				error: false,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});

		it('sets success state', () => {
			const action = {
				type: DELETE_VIDEO_CALL_SUCCESS,
				item: ITEM,
			};
			const before = {
				items: [ITEM],
				error: true,
			};
			const after = {
				items: [],
				error: false,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});

		it('sets failure state', () => {
			const action = {
				type: DELETE_VIDEO_CALL_FAILURE,
				error: ERROR,
			};
			const before = {
				items: [ITEM],
				error: false,
			};
			const after = {
				items: [ITEM],
				error: ERROR,
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});
	});

	// TODO action start

	// TODO action join

	// TODO action end
});
