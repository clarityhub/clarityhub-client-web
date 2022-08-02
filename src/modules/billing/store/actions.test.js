import * as actions from './actions';

const RESPONSE = Symbol();
const ERROR = Symbol();

const DISPATCH = () => {};
const GET_STATE = () => {};

const SERVICES = {
	api: {
		billing: {
			getAll() {
				return Promise.resolve(RESPONSE);
			},
			getInvoices() {
				return Promise.resolve(RESPONSE);
			},
			updateInfo() {
				return Promise.resolve(RESPONSE);
			},
			updateSub() {
				return Promise.resolve(RESPONSE);
			},
			cancelSub() {
				return Promise.resolve(RESPONSE);
			},
		},
	},
};

describe('billing actions', () => {
	describe('getBilling', () => {
		it('returns a promise', () => {
			const resp = actions.getBilling()(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.getBilling()(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				done();
			});
		});

		it('dispatches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => {});

			const services = {
				Logger: {
					error,
				},
				api: {
					billing: {
						getAll() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.getBilling()(dispatch, GET_STATE, { services });

			resp.catch((e) => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});

	describe('getBillingInvoices', () => {
		it('returns a promise', () => {
			const resp = actions.getBillingInvoices()(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.getBillingInvoices()(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				done();
			});
		});

		it('dispatches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });

			const services = {
				Logger: {
					error,
				},
				api: {
					billing: {
						getInvoices() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.getBillingInvoices()(dispatch, GET_STATE, { services });

			resp.catch((e) => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});

	describe('updateBilling', () => {
		const BODY = Symbol();

		it('returns a promise', () => {
			const resp = actions.updateBilling(BODY)(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.updateBilling(BODY)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				// extra dispatch for updating token
				expect(dispatch).toHaveBeenCalledTimes(3);
				done();
			});
		});

		it('does not dispatch loading if noLoading option provided', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const options = {
				noLoading: true,
			};

			const resp = actions.updateBilling(BODY, options)(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				// extra dispatch for updating token
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
					billing: {
						updateInfo() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.updateBilling(BODY)(dispatch, GET_STATE, { services });

			resp.catch(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});

	describe('updateSub', () => {
		it('returns a promise', () => {
			const resp = actions.updateSub()(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.updateSub()(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				// extra dispatch for updating token
				expect(dispatch).toHaveBeenCalledTimes(3);
				done();
			});
		});

		it('dispatches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });

			const services = {
				Logger: {
					error,
				},
				api: {
					billing: {
						updateSub() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.updateSub()(dispatch, GET_STATE, { services });

			resp.catch((e) => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});

	describe('cancelSub', () => {
		it('returns a promise', () => {
			const resp = actions.cancelSub()(DISPATCH, GET_STATE, { services: SERVICES });
			expect(resp instanceof Promise).toBeTruthy();
		});

		it('dispatches item on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.cancelSub()(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				// extra dispatch for updating token
				expect(dispatch).toHaveBeenCalledTimes(3);
				done();
			});
		});

		it('dispatches error on failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => { });

			const services = {
				Logger: {
					error,
				},
				api: {
					billing: {
						cancelSub() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.cancelSub()(dispatch, GET_STATE, { services });

			resp.catch((e) => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});
});
