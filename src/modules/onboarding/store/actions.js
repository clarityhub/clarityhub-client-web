import {
	GET_ALL_ONBOARDING_LOADING,
	GET_ALL_ONBOARDING_SUCCESS,
	GET_ALL_ONBOARDING_FAILURE,
	UPDATE_ONBOARDING_LOADING,
	UPDATE_ONBOARDING_SUCCESS,
	UPDATE_ONBOARDING_FAILURE,
	RESET_ERROR,
} from './constants';

export const getAll = () => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_ALL_ONBOARDING_LOADING,
	});

	return services.api.onboarding.getAll().then(response => {
		dispatch({
			type: GET_ALL_ONBOARDING_SUCCESS,
			items: response,
		});
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_ALL_ONBOARDING_FAILURE,
				error,
			});
		});
};

export const updateKey = (key, state) => (dispatch, getState, { services }) => {
	dispatch({
		type: UPDATE_ONBOARDING_LOADING,
		key,
	});

	return services.api.onboarding.update(key, { state }).then(response => {
		dispatch({
			type: UPDATE_ONBOARDING_SUCCESS,
			key,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_ONBOARDING_FAILURE,
				key,
				error,
			});

			return error;
		});
};

export const resetError = () => {
	return {
		type: RESET_ERROR,
	};
};
