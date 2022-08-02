import {
	GET_BILLING_FAILURE,
	GET_BILLING_LOADING,
	GET_BILLING_SUCCESS,
} from '../../billing/store/constants';

export default (state = {
	status: 'pristine',
	data: [],
}, action = {}) => {
	switch (action.type) {
	case GET_BILLING_LOADING:
		return {
			...state,
			status: 'loading',
		};
	case GET_BILLING_SUCCESS:
		return {
			...state,
			data: action.plans.data,
			status: 'ready',
		};
	case GET_BILLING_FAILURE:
		return {
			...state,
			status: 'error',
		};
	default:
		return state;
	}
};
