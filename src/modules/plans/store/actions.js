import {
	USAGE_GET_ALL_LOADING,
	USAGE_GET_ALL_SUCCESS,
	USAGE_GET_ALL_FAILURE,
} from './constants';

export const getUsage = () => (dispatch, _, { services }) => {
	dispatch({
		type: USAGE_GET_ALL_LOADING,
	});

	return services.api.plans.getUsage().then(response => {
		dispatch({
			type: USAGE_GET_ALL_SUCCESS,
			items: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: USAGE_GET_ALL_FAILURE,
				error,
			});

			return error;
		});
};
