import * as actions from './actions';

const CREATE_PAYLOAD = Symbol();
const CREATE_RESPONSE = { id: Symbol() };
const ID = '1';
const DISPATCH = () => { };
const GET_STATE = () => {
	return {};
};
const ERROR = Symbol();

const SERVICES = {
	api: {
		videoCalls: {
			get: () => Promise.resolve(CREATE_RESPONSE),
			create: () => Promise.resolve(CREATE_RESPONSE),
			update: () => Promise.resolve(CREATE_RESPONSE),
			delete: () => Promise.resolve(CREATE_RESPONSE),
			start: () => Promise.resolve(CREATE_RESPONSE),
			join: () => Promise.resolve(CREATE_RESPONSE),
			end: () => Promise.resolve(CREATE_RESPONSE),
		}
	}
};

describe('videoCalls actions', () => {
	describe('get videoCall', () => {
		it('returns a promise', () => {
			const resp = actions.getVideoCall(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.getVideoCall(ID)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					item: CREATE_RESPONSE,
				}));
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
					videoCalls: {
						get() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.getVideoCall(ID)(dispatch, GET_STATE, { services });

			resp.catch(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					error: ERROR,
				}));
				done();
			});
		});
	});

	describe('create video call', () => {
		it('returns a promise', () => {
			const resp = actions.createVideoCall(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.createVideoCall(CREATE_PAYLOAD)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					item: CREATE_RESPONSE,
				}));
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
					videoCalls: {
						create() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.createVideoCall(CREATE_PAYLOAD)(dispatch, GET_STATE, { services });

			resp.catch(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					error: ERROR,
				}));
				done();
			});
		});
	});

	describe('update videoCall', () => {
		it('returns a promise', () => {
			const resp = actions.updateVideoCall(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.updateVideoCall(ID, CREATE_PAYLOAD)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					item: CREATE_RESPONSE,
				}));
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
					videoCalls: {
						update() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.updateVideoCall(ID, CREATE_PAYLOAD)(dispatch, GET_STATE, { services });

			resp.catch(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					error: ERROR,
				}));
				done();
			});
		});
	});

	describe('delete videoCall', () => {
		it('returns a promise', () => {
			const resp = actions.deleteVideoCall(ID)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.deleteVideoCall(ID, CREATE_PAYLOAD)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					item: CREATE_RESPONSE,
				}));
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
					videoCalls: {
						delete() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.deleteVideoCall(ID, CREATE_PAYLOAD)(dispatch, GET_STATE, { services });

			resp.catch(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
					error: ERROR,
				}));
				done();
			});
		});
	});
});
