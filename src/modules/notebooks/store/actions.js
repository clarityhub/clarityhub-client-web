import {
	GET_TAG_ITEMS_PARTIAL,
} from 'modules/tags/store/constants';
import {
	SET_CURRENT_NOTEBOOK,
	GET_ALL_LOADING,
	GET_ALL_SUCCESS,
	GET_ALL_FAILURE,
	CREATE_NOTEBOOK_LOADING,
	CREATE_NOTEBOOK_SUCCESS,
	CREATE_NOTEBOOK_FAILURE,
	GET_NOTEBOOK_LOADING,
	GET_NOTEBOOK_SUCCESS,
	GET_NOTEBOOK_FAILURE,
	UPDATE_NOTEBOOK_LOADING,
	UPDATE_NOTEBOOK_SUCCESS,
	UPDATE_NOTEBOOK_FAILURE,
	DELETE_NOTEBOOK_LOADING,
	DELETE_NOTEBOOK_SUCCESS,
	DELETE_NOTEBOOK_FAILURE,
} from './constants';

export const getAll = () => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_ALL_LOADING,
	});

	return services.api.notebooks.getAll().then(response => {
		const { tagItems, items } = response || {};

		dispatch({
			type: GET_ALL_SUCCESS,
			items,
		});

		dispatch({
			type: GET_TAG_ITEMS_PARTIAL,
			items: tagItems,
		});

		return { tagItems, items };
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_ALL_FAILURE,
				error,
			});
		});
};

/**
 * Notebook has been created notification.
 *
 * Used by real-time notifications
 *
 * @param {Object} payload
 */
export const createdNotebook = (payload) => {
	return {
		type: CREATE_NOTEBOOK_SUCCESS,
		item: payload.item,
	};
};

export const createNotebook = (payload) => (dispatch, getState, { services }) => {
	dispatch({
		type: CREATE_NOTEBOOK_LOADING,
	});

	return services.api.notebooks.create(payload).then((response) => {
		dispatch({
			type: CREATE_NOTEBOOK_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: CREATE_NOTEBOOK_FAILURE,
				error,
			});

			throw error;
		});
};

export const getNotebook = (id, options = { forceGet: true, allow404: false }) => (dispatch, getState, { services }) => {
	let needToLoad = options.forceGet;
	const allow404 = options.allow404;
	const item = getState().notebooks.items.find(i => i.id === id);

	if (!options.forceGet) {

		if (!item) {
			// We need to do a get anyway
			needToLoad = true;
		}
	}

	if (needToLoad) {
		dispatch({
			type: GET_NOTEBOOK_LOADING,
		});

		return services.api.notebooks.get(id).then(response => {
			dispatch({
				type: GET_NOTEBOOK_SUCCESS,
				item: response,
			});
			return response;
		})
			.catch(error => {
				if (allow404 && error.message && error.message.error && error.message.error.toLowerCase() === 'not found') {
					dispatch({
						type: GET_NOTEBOOK_FAILURE,
						error: false,
					});
					return;
				}

				services.Logger.error(error);
				dispatch({
					type: GET_NOTEBOOK_FAILURE,
					error,
				});

				throw error;
			});
	}
	dispatch({
		type: GET_NOTEBOOK_SUCCESS,
		item,
	});
	return Promise.resolve(item);

};

export const updateNotebook = (id, data) => (dispatch, getState, { services }) => {
	dispatch({
		type: UPDATE_NOTEBOOK_LOADING,
		id,
	});

	return services.api.notebooks.update(id, data).then(response => {
		dispatch({
			type: UPDATE_NOTEBOOK_SUCCESS,
			id,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_NOTEBOOK_FAILURE,
				id,
				error,
			});

			return error;
		});
};

export const deleteNotebook = (id, data) => (dispatch, getState, { services }) => {
	dispatch({
		type: DELETE_NOTEBOOK_LOADING,
		id,
	});

	return services.api.notebooks.delete(id, data).then(response => {
		dispatch({
			type: DELETE_NOTEBOOK_SUCCESS,
			id,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: DELETE_NOTEBOOK_FAILURE,
				id,
				error,
			});

			return error;
		});
};

export const setCurrentNotebook = (item) => ({
	type: SET_CURRENT_NOTEBOOK,
	item,
});
