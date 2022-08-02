import {
	GET_ALL_RECENT_ACTIVITY_LOADING,
	GET_ALL_RECENT_ACTIVITY_SUCCESS,
	GET_ALL_RECENT_ACTIVITY_FAILURE,
} from './constants';

export const getAll = () => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_ALL_RECENT_ACTIVITY_LOADING,
	});

	return services.api.activities.getAll().then(response => {
		dispatch({
			type: GET_ALL_RECENT_ACTIVITY_SUCCESS,
			items: response,
		});

	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_ALL_RECENT_ACTIVITY_FAILURE,
				error,
			});
		});
};
