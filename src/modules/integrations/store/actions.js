import {
	GET_LOADING,
	GET_SUCCESS,
	GET_FAILURE,
	GET_INFO_LOADING,
	GET_INFO_SUCCESS,
	GET_INFO_FAILURE,
	GET_ALL_LOADING,
	GET_ALL_SUCCESS,
	GET_ALL_FAILURE,
	CREATE_LOADING,
	CREATE_SUCCESS,
	CREATE_FAILURE,
	UPDATE_LOADING,
	UPDATE_SUCCESS,
	UPDATE_FAILURE,
	TEST_LOADING,
	TEST_SUCCESS,
	TEST_FAILURE,
	DELETE_LOADING,
	DELETE_SUCCESS,
	DELETE_FAILURE,
} from './constants';

export const get = (id) => (dispatch, _, { services }) => {
	dispatch({
		type: GET_LOADING,
	});

	return services.api.integrations.get(id).then(response => {
		dispatch({
			type: GET_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_FAILURE,
				error,
			});

			return error;
		});
};

export const getIntegrationsInfo = () => (dispatch, _, { services }) => {
	dispatch({
		type: GET_INFO_LOADING,
	});

	return services.api.integrations.info().then(response => {
		dispatch({
			type: GET_INFO_SUCCESS,
			items: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_INFO_FAILURE,
				error,
			});

			return error;
		});
};

export const getAll = () => (dispatch, _, { services }) => {
	dispatch({
		type: GET_ALL_LOADING,
	});

	return services.api.integrations.getAll().then(response => {
		dispatch({
			type: GET_ALL_SUCCESS,
			items: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_ALL_FAILURE,
				error,
			});

			return error;
		});
};

export const create = (payload) => (dispatch, _, { services }) => {
	dispatch({
		type: CREATE_LOADING,
	});

	return services.api.integrations.create(payload).then(response => {
		dispatch({
			type: CREATE_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: CREATE_FAILURE,
				error,
			});

			return error;
		});
};

export const update = (id, payload) => (dispatch, _, { services }) => {
	dispatch({
		type: UPDATE_LOADING,
	});

	return services.api.integrations.update(id, payload).then(response => {
		dispatch({
			type: UPDATE_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_FAILURE,
				error,
			});

			return error;
		});
};

export const test = (id, payload) => (dispatch, _, { services }) => {
	dispatch({
		type: TEST_LOADING,
	});

	return services.api.integrations.test(id, payload).then(response => {
		dispatch({
			type: TEST_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: TEST_FAILURE,
				error,
			});

			return error;
		});
};

export const del = (id) => (dispatch, _, { services }) => {
	dispatch({
		type: DELETE_LOADING,
	});

	return services.api.integrations.delete(id).then(response => {
		dispatch({
			type: DELETE_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: DELETE_FAILURE,
				error,
			});

			return error;
		});
};
