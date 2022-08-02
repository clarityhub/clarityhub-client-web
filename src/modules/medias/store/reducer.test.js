import reducer from './reducer';
import {
	GET_MEDIA_LOADING,
	GET_MEDIA_SUCCESS,
	GET_MEDIA_FAILURE,
	CREATE_MEDIA_LOADING,
	CREATE_MEDIA_SUCCESS,
	CREATE_MEDIA_FAILURE,
	UPDATE_MEDIA_SUCCESS,

	MEDIA_FINALIZING,
	MEDIA_UPLOADING,
	MEDIA_UPLOAD_FAILED,
} from './constants';

const ITEM = {
	id: Symbol(),
};
const ERROR = Symbol();

describe('media reducer', () => {
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

	describe('get media', () => {
		it('sets loading state', () => {
			const action = {
				type: GET_MEDIA_LOADING,
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
				type: GET_MEDIA_SUCCESS,
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
				type: GET_MEDIA_FAILURE,
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

	describe('create media', () => {
		it('sets loading state', () => {
			const action = {
				type: CREATE_MEDIA_LOADING,
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
				type: CREATE_MEDIA_SUCCESS,
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
				type: CREATE_MEDIA_FAILURE,
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

	describe('update media', () => {
		it('sets success state', () => {
			const action = {
				type: UPDATE_MEDIA_SUCCESS,
				item: ITEM,
			};
			const before = {
				error: false,
				items: [ITEM],
			};
			const after = {
				error: false,
				items: [ITEM],
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});
	});

	describe('media modifiers', () => {
		it('sets finalizing state', () => {
			const action = {
				type: MEDIA_FINALIZING,
				mediaId: ITEM.id,
			};
			const before = {
				items: [ITEM],
			};
			const after = {
				items: [{
					...ITEM,
					meta: {
						status: 'uploading',
						progress: 0,
					},
				}],
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});

		it('sets uploading state', () => {
			const action = {
				type: MEDIA_UPLOADING,
				mediaId: ITEM.id,
				progress: 20,
			};
			const before = {
				items: [ITEM],
			};
			const after = {
				items: [{
					...ITEM,
					meta: {
						status: 'uploading',
						progress: 20,
					},
				}],
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});

		it('sets upload failed state', () => {
			const action = {
				type: MEDIA_UPLOAD_FAILED,
				error: ERROR,
				mediaId: ITEM.id,
			};
			const before = {
				items: [ITEM],
				error: false,
			};
			const after = {
				error: false,
				items: [{
					...ITEM,
					meta: {
						status: 'error',
						progress: 0,
						error: ERROR,
					},
				}],
			};

			expect(reducer(before, action)).toStrictEqual(after);
		});
	});
});
