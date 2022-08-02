import * as actions from './actions';

const LOGIN = () => {};
const TOKEN = Symbol();
const _ = {};
const RESPONSE = Symbol();

const DISPATCH = () => {};
const GET_STATE = () => {};
const SERVICES = {
	api: {
		auth: {
			loginWorkspace: () => Promise.resolve(RESPONSE),
			refresh: () => Promise.resolve(RESPONSE),
		},
	},
};

describe('auth/store/actions', () => {
	describe('login', () => {
		it('calls login service', () => {
			const login = jest.fn(LOGIN);

			actions.login({ token: TOKEN })(_, _, {
				services: {
					api: {
						auth: {
							login,
						},
					},
				},
			});

			expect(login).toHaveBeenCalledWith(
				expect.objectContaining({
					token: TOKEN,
				}),
			);
		});
	});

	describe('loginWorkspace', () => {
		it('dispatches on success', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const workspaceId = '1';
			const token = 'jwt';


			const resp = actions.loginWorkspace(workspaceId, { token })(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				done();
			});
		});

		it('dispatches failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => {});

			const workspaceId = '1';
			const token = 'jwt';
			const ERROR = Symbol();
			const services = {
				Logger: {
					error,
				},
				api: {
					auth: {
						loginWorkspace: () => Promise.reject(ERROR),
					},
				},
			};

			const resp = actions.loginWorkspace(workspaceId, { token })(dispatch, GET_STATE, { services });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);

				done();
			});
		});
	});

	describe('refresh', () => {
		it('dispatches on success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.refresh()(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				done();
			});
		});

		it('dispatches failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
			const error = jest.fn(() => {});

			const ERROR = Symbol();
			const services = {
				Logger: {
					error,
				},
				api: {
					auth: {
						refresh: () => Promise.reject(ERROR),
					},
				},
			};

			const resp = actions.refresh()(dispatch, GET_STATE, { services });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);

				done();
			});
		});
	});

	describe('logout', () => {
		// TODO
	});
});
