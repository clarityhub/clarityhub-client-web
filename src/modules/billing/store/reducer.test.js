import reducer from './reducer';
import * as constants from './constants';

const ERROR = Symbol();
const BILLING_DATA = {
	ccCardType: 'ccCardType',
	ccExpiration: 'ccExpiration',
	ccLastFour: 'ccLastFour',
	billingEmail: 'billingEmail',
	line1: 'line1',
	line2: 'line2',
	city: 'city',
	postal_code: 'postal_code',
	state: 'state',
	country: 'country',
};
const INVOICES = Symbol();

describe('billing reducer', () => {
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

	describe('getBilling', () => {
		it('sets loading state', () => {
			const before = undefined;
			const after = {
				status: 'loading',
			};
			const action = {
				type: constants.GET_BILLING_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const before = undefined;
			const after = {
				data: {
					card: {
						ccCardType: 'ccCardType',
						ccExpiration: 'ccExpiration',
						ccLastFour: 'ccLastFour',
					},
					address: {
						billingEmail: 'billingEmail',
						line1: 'line1',
						line2: 'line2',
						city: 'city',
						postal_code: 'postal_code',
						state: 'state',
						country: 'country',
					},
				},
				status: 'ready',
				cancelStatus: 'done',
				updateStatus: 'done',
			};
			const action = {
				type: constants.GET_BILLING_SUCCESS,
				data: BILLING_DATA,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets failure state', () => {
			const before = undefined;
			const after = {
				status: 'failed',
				error: ERROR,
			};
			const action = {
				type: constants.GET_BILLING_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('getBillingInvoices', () => {
		it('sets loading state', () => {
			const before = undefined;
			const after = {
				invoiceStatus: 'loading',
			};
			const action = {
				type: constants.GET_BILLING_INVOICES_LOADING,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets success state', () => {
			const before = undefined;
			const after = {
				invoices: INVOICES,
				invoiceStatus: 'ready',
			};
			const action = {
				type: constants.GET_BILLING_INVOICES_SUCCESS,
				data: INVOICES,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});

		it('sets failure state', () => {
			const before = undefined;
			const after = {
				invoiceStatus: 'failed',
				error: ERROR,
			};
			const action = {
				type: constants.GET_BILLING_INVOICES_FAILURE,
				error: ERROR,
			};

			expect(reducer(before, action)).toMatchObject(after);
		});
	});

	describe('updateBilling', () => {
		// XXX
	});

	describe('updateSubscription', () => {
		// XXX
	});

	describe('cancelPlan', () => {
		// XXX
	});
});
