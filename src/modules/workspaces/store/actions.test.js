import * as actions from './actions';

const RESPONSE = Symbol();
const CREATE_RESPONSE = { id: Symbol() };
const ERROR = Symbol();

const ID = '1';
const CREATE_PAYLOAD = Symbol();
const TOKEN = { token: Symbol() };
const DISPATCH = () => {};
const GET_STATE = () => {
	return {};
};
const SERVICES = {
	api: {
		workspaces: {
			get() {
				return Promise.resolve(RESPONSE);
			},
			getAll() {
				return Promise.resolve(RESPONSE);
			},
			getAllAuthed() {
				return Promise.resolve(RESPONSE);
			},
			create() {
				return Promise.resolve(CREATE_RESPONSE);
			},
			update() {
				return Promise.resolve(CREATE_RESPONSE);
			},
			delete() {
				return Promise.resolve(CREATE_RESPONSE);
			},
		},
	},
	Logger: {
		error() {},
	},
};

describe('workspace actions', () => {
	describe('get', () => {
		it('returns a promise', () => {
			const resp = actions.get(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.get(ID)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				done();
			});
		});

		it('dispaches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => {});
			const services = {
				Logger: {
					error,
				},
				api: {
					workspaces: {
						get() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.get(ID)(dispatch, GET_STATE, { services });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});

	describe('getAll', () => {
		it('returns a promise', () => {
			const resp = actions.getAll(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.getAll(ID)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				done();
			});
		});

		it('dispaches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });
			const services = {
				Logger: {
					error,
				},
				api: {
					workspaces: {
						getAll() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.getAll(ID)(dispatch, GET_STATE, { services });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});

	describe('getAllAuthed', () => {
		it('returns a promise', () => {
			const resp = actions.getAllAuthed(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.getAllAuthed(ID)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				done();
			});
		});

		it('dispaches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });
			const services = {
				Logger: {
					error,
				},
				api: {
					workspaces: {
						getAllAuthed() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.getAllAuthed(ID)(dispatch, GET_STATE, { services });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});

	describe('createWorkspace', () => {
		it('returns a promise', () => {
			const resp = actions.createWorkspace(CREATE_PAYLOAD, TOKEN)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.createWorkspace(CREATE_PAYLOAD, TOKEN)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				// 3 times, since one of those times it to login to the workspace
				expect(dispatch).toHaveBeenCalledTimes(3);
				done();
			});
		});

		it('dispaches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });
			const services = {
				Logger: {
					error,
				},
				api: {
					workspaces: {
						create() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.createWorkspace(CREATE_PAYLOAD, TOKEN)(dispatch, GET_STATE, { services });

			resp.catch(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});

	describe('update', () => {
		it('returns a promise', () => {
			const resp = actions.update(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.update(ID)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				done();
			});
		});

		it('dispaches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });
			const services = {
				Logger: {
					error,
				},
				api: {
					workspaces: {
						update() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.update(ID)(dispatch, GET_STATE, { services });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});

	describe('del', () => {
		it('returns a promise', () => {
			const resp = actions.del(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.del(ID)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				// 3 times since logout is also called
				expect(dispatch).toHaveBeenCalledTimes(3);
				done();
			});
		});

		it('dispaches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });
			const services = {
				Logger: {
					error,
				},
				api: {
					workspaces: {
						delete() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.del(ID)(dispatch, GET_STATE, { services });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});
});
