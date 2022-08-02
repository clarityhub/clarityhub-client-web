import { loginWorkspace, logout } from '../../auth/store/actions';
import {
	GET_LOADING,
	GET_SUCCESS,
	GET_FAILURE,
	GET_ALL_LOADING,
	GET_ALL_SUCCESS,
	GET_ALL_FAILURE,
	CREATE_WORKSPACE_LOADING,
	CREATE_WORKSPACE_SUCCESS,
	CREATE_WORKSPACE_FAILURE,
	UPDATE_WORKSPACE_LOADING,
	UPDATE_WORKSPACE_SUCCESS,
	UPDATE_WORKSPACE_FAILURE,
	DELETE_WORKSPACE_LOADING,
	DELETE_WORKSPACE_SUCCESS,
	DELETE_WORKSPACE_FAILURE,
} from './constants';

export const get = (id) => (dispatch, _, { services }) => {
	dispatch({
		type: GET_LOADING,
	});

	return services.api.workspaces.get(id).then(response => {
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

export const getAll = ({ token }) => (dispatch, _, { services }) => {
	dispatch({
		type: GET_ALL_LOADING,
	});

	return services.api.workspaces.getAll({
		token,
	}).then(response => {
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

export const getAllAuthed = () => (dispatch, _, { services }) => {
	dispatch({
		type: GET_ALL_LOADING,
	});

	return services.api.workspaces.getAllAuthed().then(response => {
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

export const createWorkspace = (payload, { token }) => (dispatch, _, { services }) => {
	dispatch({
		type: CREATE_WORKSPACE_LOADING,
	});

	return services.api.workspaces.create(payload, {
		token,
	}).then(response => {
		dispatch({
			type: CREATE_WORKSPACE_SUCCESS,
			items: response,
		});

		return dispatch(loginWorkspace(response.id, { token }));
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: CREATE_WORKSPACE_FAILURE,
				error,
			});

			throw error;
		});
};

export const update = (id, payload) => (dispatch, _, { services }) => {
	dispatch({
		type: UPDATE_WORKSPACE_LOADING,
	});

	return services.api.workspaces.update(id, payload).then(response => {
		dispatch({
			type: UPDATE_WORKSPACE_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_WORKSPACE_FAILURE,
				error,
			});

			return error;
		});
};

export const del = (id) => (dispatch, _, { services }) => {
	dispatch({
		type: DELETE_WORKSPACE_LOADING,
	});

	return services.api.workspaces.delete(id).then(response => {
		dispatch({
			type: DELETE_WORKSPACE_SUCCESS,
			item: response,
		});

		dispatch(logout());
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: DELETE_WORKSPACE_FAILURE,
				error,
			});

			return error;
		});
};
