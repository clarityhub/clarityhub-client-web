import {
	GET_ALL_TAGS_LOADING,
	GET_ALL_TAGS_SUCCESS,
	GET_ALL_TAGS_FAILURE,
	GET_TAG_LOADING,
	GET_TAG_SUCCESS,
	GET_TAG_FAILURE,
	CREATE_TAG_LOADING,
	CREATE_TAG_SUCCESS,
	CREATE_TAG_FAILURE,
	UPDATE_TAG_LOADING,
	UPDATE_TAG_SUCCESS,
	UPDATE_TAG_FAILURE,
	DELETE_TAG_LOADING,
	DELETE_TAG_SUCCESS,
	DELETE_TAG_FAILURE,

	GET_TAG_ITEMS_LOADING,
	GET_TAG_ITEMS_SUCCESS,
	GET_TAG_ITEMS_FAILURE,
	CREATE_TAG_ITEM_LOADING,
	CREATE_TAG_ITEM_SUCCESS,
	CREATE_TAG_ITEM_FAILURE,
	DELETE_TAG_ITEM_LOADING,
	DELETE_TAG_ITEM_SUCCESS,
	DELETE_TAG_ITEM_FAILURE,

	GET_TAG_ITEM_STATISTICS_LOADING,
	GET_TAG_ITEM_STATISTICS_SUCCESS,
	GET_TAG_ITEM_STATISTICS_FAILURE,
} from './constants';

export const getAll = () => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_ALL_TAGS_LOADING,
	});

	return services.api.tags.getAll().then((response) => {
		dispatch({
			type: GET_ALL_TAGS_SUCCESS,
			items: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_ALL_TAGS_FAILURE,
				error,
			});
		});
};

export const get = (tagPath) => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_TAG_LOADING,
	});

	return services.api.tags.get(tagPath).then((response) => {
		dispatch({
			type: GET_TAG_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_TAG_FAILURE,
				error,
			});
		});
};

export const create = (payload) => (dispatch, getState, { services }) => {
	dispatch({
		type: CREATE_TAG_LOADING,
	});

	return services.api.tags.create(payload).then((response) => {
		dispatch({
			type: CREATE_TAG_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: CREATE_TAG_FAILURE,
				error,
			});
		});
};

export const update = (tagPath, payload) => (dispatch, getState, { services }) => {
	dispatch({
		type: UPDATE_TAG_LOADING,
	});

	return services.api.tags.update(tagPath, payload).then((response) => {
		dispatch({
			type: UPDATE_TAG_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_TAG_FAILURE,
				error,
			});
		});
};

export const del = (tagPath) => (dispatch, getState, { services }) => {
	dispatch({
		type: DELETE_TAG_LOADING,
	});

	return services.api.tags.delete(tagPath).then((response) => {
		dispatch({
			type: DELETE_TAG_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: DELETE_TAG_FAILURE,
				error,
			});
		});
};

export const getItemsForTag = (tagPath) => (dispatch, getState, services) => {
	// XXX this should get its own reducer
};

export const getTagItems = (type, itemId) => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_TAG_ITEMS_LOADING,
		request: {
			type,
			itemId,
		},
	});

	return services.api.tagItems.getAllForItem(type, itemId).then((response) => {
		dispatch({
			type: GET_TAG_ITEMS_SUCCESS,
			request: {
				type,
				itemId,
			},
			items: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_TAG_ITEMS_FAILURE,
				error,
			});
		});
};

export const getTagItemsStatistics = () => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_TAG_ITEM_STATISTICS_LOADING,
	});

	return services.api.tagItems.getTagItemsStatistics().then((response) => {
		dispatch({
			type: GET_TAG_ITEM_STATISTICS_SUCCESS,
			items: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_TAG_ITEM_STATISTICS_FAILURE,
				error,
			});
		});
};

export const createTagItem = (payload) => (dispatch, getState, { services }) => {
	dispatch({
		type: CREATE_TAG_ITEM_LOADING,
	});

	return services.api.tagItems.create(payload).then((response) => {
		dispatch({
			type: CREATE_TAG_ITEM_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: CREATE_TAG_ITEM_FAILURE,
				error,
			});
		});
};

export const deleteTagItem = (itemTagPath) => (dispatch, getState, { services }) => {
	dispatch({
		type: DELETE_TAG_ITEM_LOADING,
	});

	return services.api.tagItems.delete(itemTagPath).then((response) => {
		dispatch({
			type: DELETE_TAG_ITEM_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: DELETE_TAG_ITEM_FAILURE,
				error,
			});
		});
};
