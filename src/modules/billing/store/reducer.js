import pick from 'lodash.pick';
import {
	GET_BILLING_LOADING,
	GET_BILLING_FAILURE,
	GET_BILLING_SUCCESS,
	GET_BILLING_INVOICES_LOADING,
	GET_BILLING_INVOICES_SUCCESS,
	GET_BILLING_INVOICES_FAILURE,
	UPDATE_BILLING_LOADING,
	UPDATE_BILLING_SUCCESS,
	UPDATE_BILLING_FAILURE,
	UPDATE_SUBSCRIPTION_LOADING,
	UPDATE_SUBSCRIPTION_SUCCESS,
	UPDATE_SUBSCRIPTION_FAILURE,
	CANCEL_PLAN_LOADING,
	CANCEL_PLAN_SUCCESS,
	CANCEL_PLAN_FAILURE,
} from './constants';

export default (state = {
	status: 'pristine',
	invoiceStatus: 'pristine',
	cancelStatus: 'pristine',
	updateStatus: 'pristine',
	data: null,
	invoices: null,
	error: null,
}, action = {}) => {
	switch (action.type) {
	case GET_BILLING_INVOICES_LOADING:
		return {
			...state,
			invoiceStatus: 'loading',
		};
	case GET_BILLING_INVOICES_SUCCESS:
		return {
			...state,
			invoices: action.data,
			invoiceStatus: 'ready',
		};
	case GET_BILLING_INVOICES_FAILURE:
		return {
			...state,
			...action,
			invoiceStatus: 'failed',
		};
	case CANCEL_PLAN_LOADING:
		return {
			...state,
			cancelStatus: 'loading',
		};
	case UPDATE_SUBSCRIPTION_LOADING:
		return {
			...state,
			updateStatus: 'loading',
		};
	case UPDATE_BILLING_LOADING:
	case GET_BILLING_LOADING:
		return {
			...state,
			status: 'loading',
		};
	case UPDATE_SUBSCRIPTION_SUCCESS:
	case CANCEL_PLAN_SUCCESS:
	case UPDATE_BILLING_SUCCESS:
	case GET_BILLING_SUCCESS: {
		// I want to group the types of data
		const card = pick(action.data, ['ccCardType', 'ccExpiration', 'ccLastFour']);
		card.hasData = Boolean(Object.keys(card).length);

		const address = pick(action.data, [
			'billingEmail',
			'line1',
			'line2',
			'city',
			'postal_code',
			'state',
			'country',
		]);
		address.hasData = Boolean(Object.keys(address).length);

		return {
			...state,
			// ...action,
			data: {
				...state.data,
				...action.data,
				card,
				address,
			},
			status: 'ready',
			cancelStatus: 'done',
			updateStatus: 'done',
		};
	}
	case CANCEL_PLAN_FAILURE:
		return {
			...state,
			...action,
			cancelStatus: 'failed',
		};
	case UPDATE_SUBSCRIPTION_FAILURE:
		return {
			...state,
			...action,
			updateStatus: 'failed',
		};
	case UPDATE_BILLING_FAILURE:
	case GET_BILLING_FAILURE:
		return {
			...state,
			...action,
			status: 'failed',
		};
	default: return state;
	}
};
