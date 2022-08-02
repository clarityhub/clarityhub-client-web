import * as actions from './actions';

const RESPONSE = Symbol();
const ERROR = Symbol();
const DISPATCH = () => {};
const GET_STATE = () => {
	return {};
};
const SERVICES = {
	api: {
		plans: {
			getUsage: () => Promise.resolve(RESPONSE),
		},
	},
};

describe('plans store actions', () => {
	describe('getUsage', () => {
		it('is a function', () => {
			expect(typeof actions.getUsage).toBe('function');
		});

		it('dispatches success', (done) => {
			const dispatch = jest.fn(DISPATCH);

			const resp = actions.getUsage()(dispatch, GET_STATE, { services: SERVICES });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				done();
			});
		});

		it('dispatches failure', (done) => {
			const dispatch = jest.fn(DISPATCH);
    			const error = jest.fn(() => {});

			const services = {
				Logger: {
					error,
				},
				api: {
					plans: {
						getUsage() {
							return Promise.reject(ERROR);
						},
					},
				},
			};

			const resp = actions.getUsage()(dispatch, GET_STATE, { services });

			resp.then(() => {
				expect(dispatch).toHaveBeenCalledTimes(2);
				expect(error).toHaveBeenCalledTimes(1);
				done();
			});
		});
	});
});
