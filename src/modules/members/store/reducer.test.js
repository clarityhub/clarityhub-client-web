import reducer from './reducer';
import * as constants from './constants';

const ITEM = { userId: '1', text: 'old' };
const NEW_ITEM = { userId: '1', text: 'new' };
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

	describe('get all', () => {
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

	describe('get', () => {
		it('sets single loading state', () => {
			const before = undefined;
			const after = {
				isReady: false,
			};
			const action = {
				type: constants.GET_MEMBER_LOADING,
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
				type: constants.GET_MEMBER_SUCCESS,
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
				type: constants.GET_MEMBER_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('invite', () => {
		it('sets invite loading state', () => {
			const before = undefined;
			const after = {
				isCreating: true,
			};
			const action = {
				type: constants.INVITE_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets invite success state', () => {
			const before = undefined;
			const after = {
				isCreating: false,
			};
			const action = {
				type: constants.INVITE_SUCCESS,
				item: ITEM,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets invite failure state', () => {
			const before = undefined;
			const after = {
				isCreating: false,
				error: ERROR,
			};
			const action = {
				type: constants.INVITE_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('get me', () => {
		it('sets loading state', () => {
			const before = undefined;
			const after = {
				isReady: false,
				getMeError: false,
			};
			const action = {
				type: constants.GET_ME_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const before = undefined;
			const after = {
				isReady: true,
				getMeError: false,
				hasLoadedMe: true,
				me: ITEM,
				items: [ITEM],
			};
			const action = {
				type: constants.GET_ME_SUCCESS,
				item: ITEM,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets failure state', () => {
			const before = undefined;
			const after = {
				isReady: true,
				getMeError: ERROR,
			};
			const action = {
				type: constants.GET_ME_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('resend invite', () => {
		it('sets loading state', () => {
			const before = undefined;
			const after = {
				isCreating: true,
			};
			const action = {
				type: constants.RESEND_INVITE_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const before = undefined;
			const after = {
				isCreating: false,
				items: [ITEM],
			};
			const action = {
				type: constants.RESEND_INVITE_SUCCESS,
				item: ITEM,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets failure state', () => {
			const before = undefined;
			const after = {
				isCreating: false,
				error: ERROR,
			};
			const action = {
				type: constants.RESEND_INVITE_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('kick member', () => {
		it('sets loading state', () => {
			const before = undefined;
			const after = {
				isPatching: true,
			};
			const action = {
				type: constants.KICK_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const before = {
				items: [ITEM],
			};
			const after = {
				isPatching: false,
				items: [],
			};
			const action = {
				type: constants.KICK_SUCCESS,
				item: ITEM,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets failure state', () => {
			const before = undefined;
			const after = {
				isPatching: false,
				error: ERROR,
			};
			const action = {
				type: constants.KICK_FAILURE,
				error: ERROR,
			};


			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('leave workspace', () => {
		it('sets loading state', () => {
			const before = undefined;
			const after = {
				isPatching: true,
			};
			const action = {
				type: constants.LEAVE_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const before = undefined;
			const after = {
				isPatching: false,
			};
			const action = {
				type: constants.LEAVE_SUCCESS,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets failure state', () => {
			const before = undefined;
			const after = {
				isPatching: false,
				error: ERROR,
			};
			const action = {
				type: constants.LEAVE_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('update member', () => {
		it('sets loading state', () => {
			const before = undefined;
			const after = {
				isPatching: true,
			};
			const action = {
				type: constants.UPDATE_MEMBER_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const before = {
				items: [ITEM],
			};
			const after = {
				isPatching: false,
				items: [NEW_ITEM],
			};
			const action = {
				type: constants.UPDATE_MEMBER_SUCCESS,
				item: NEW_ITEM,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets failure state', () => {
			const before = undefined;
			const after = {
				isPatching: false,
				error: ERROR,
			};
			const action = {
				type: constants.UPDATE_MEMBER_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});
});
