import * as actions from './actions';

const RESPONSE = Symbol();
const CREATE_RESPONSE = { id: Symbol() };
const ERROR = Symbol();

const ID = '1';
const CREATE_PAYLOAD = Symbol();
const TOKEN = { token: Symbol() };
const DISPATCH = () => { };
const GET_STATE = () => {
	return {
		notebooks: {
			items: [],
		},
	};
};
const SERVICES = {
	api: {
		notebooks: {
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
};

describe('workspace actions', () => {
	describe('getNotebook', () => {
		it('returns a promise', () => {
			const resp = actions.getNotebook(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.getNotebook(ID)(dispatch, GET_STATE, { services: SERVICES });

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
					notebooks: {
						get() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.getNotebook(ID)(dispatch, GET_STATE, { services });

			resp.catch((e) => {
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
				// 3 times since it calls tagItems
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
					notebooks: {
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

	describe('createNotebook', () => {
		it('returns a promise', () => {
			const resp = actions.createNotebook(CREATE_PAYLOAD, TOKEN)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.createNotebook(CREATE_PAYLOAD, TOKEN)(dispatch, GET_STATE, { services: SERVICES });

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
					notebooks: {
						create() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.createNotebook(CREATE_PAYLOAD, TOKEN)(dispatch, GET_STATE, { services });

			resp.catch((e) => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});

	describe('update', () => {
		it('returns a promise', () => {
			const resp = actions.updateNotebook(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.updateNotebook(ID)(dispatch, GET_STATE, { services: SERVICES });

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
					notebooks: {
						update() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.updateNotebook(ID)(dispatch, GET_STATE, { services });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});

	describe('deleteNotebook', () => {
		it('returns a promise', () => {
			const resp = actions.deleteNotebook(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.deleteNotebook(ID)(dispatch, GET_STATE, { services: SERVICES });

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
					notebooks: {
						delete() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.deleteNotebook(ID)(dispatch, GET_STATE, { services });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});
});
