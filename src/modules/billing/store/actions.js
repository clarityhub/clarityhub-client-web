import { refresh } from 'modules/auth/store/actions';

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

export const getBilling = () => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_BILLING_LOADING,
	});

	return services.api.billing.getAll().then((response) => {
		dispatch({
			...response,
			type: GET_BILLING_SUCCESS,
		});

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_BILLING_FAILURE,
				error,
			});
			throw error;
		});
};

export const getBillingInvoices = () => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_BILLING_INVOICES_LOADING,
	});

	return services.api.billing.getInvoices().then((response) => {
		dispatch({
			...response,
			type: GET_BILLING_INVOICES_SUCCESS,
		});

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_BILLING_INVOICES_FAILURE,
				error,
			});
			throw error;
		});
};

export const updateBilling = (body, options = {}) => (dispatch, getState, { services }) => {
	if (!options.noLoading) {
		dispatch({
			type: UPDATE_BILLING_LOADING,
		});
	}

	return services.api.billing.updateInfo(body).then((response) => {
		dispatch({
			...response,
			type: UPDATE_BILLING_SUCCESS,
		});

		// refresh token so it has latest permissions
		dispatch(refresh());

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_BILLING_FAILURE,
				error,
			});

			throw error;
		});
};

export const updateSub = (body) => (dispatch, getState, { services }) => {
	dispatch({
		type: UPDATE_SUBSCRIPTION_LOADING,
	});

	return services.api.billing.updateSub(body).then((response) => {
		dispatch({
			...response,
			type: UPDATE_SUBSCRIPTION_SUCCESS,
		});

		// refresh token so it has latest permissions
		dispatch(refresh());

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_SUBSCRIPTION_FAILURE,
				error,
			});
			throw error;
		});
};

export const cancelSub = () => (dispatch, getState, { services }) => {
	dispatch({
		type: CANCEL_PLAN_LOADING,
	});

	return services.api.billing.cancelSub().then((response) => {
		dispatch({
			...response,
			type: CANCEL_PLAN_SUCCESS,
		});

		// refresh token so it has latest permissions
		dispatch(refresh());

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: CANCEL_PLAN_FAILURE,
				error,
			});
			throw error;
		});
};
