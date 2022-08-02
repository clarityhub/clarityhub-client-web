import {
	GET_TAG_ITEMS_PARTIAL,
} from 'modules/tags/store/constants';
import {
	GET_ALL_LOADING,
	GET_ALL_SUCCESS,
	GET_ALL_FAILURE,
	CREATE_INTERVIEW_LOADING,
	CREATE_INTERVIEW_SUCCESS,
	CREATE_INTERVIEW_FAILURE,
	GET_INTERVIEW_LOADING,
	GET_INTERVIEW_SUCCESS,
	GET_INTERVIEW_FAILURE,
	UPDATE_INTERVIEW_LOADING,
	UPDATE_INTERVIEW_SUCCESS,
	UPDATE_INTERVIEW_FAILURE,
	DELETE_INTERVIEW_LOADING,
	DELETE_INTERVIEW_SUCCESS,
	DELETE_INTERVIEW_FAILURE,
} from './constants';

export const getAll = () => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_ALL_LOADING,
	});

	return services.api.interviews.getAll().then(response => {
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
 * Interview has been created notification.
 *
 * Used by real-time notifications
 *
 * @param {Object} payload
 */
export const createdInterview = (payload) => {
	return {
		type: CREATE_INTERVIEW_SUCCESS,
		item: payload.item,
	};
};

export const createInterview = (payload) => (dispatch, getState, { services }) => {
	dispatch({
		type: CREATE_INTERVIEW_LOADING,
	});

	return services.api.interviews.create(payload).then((response) => {
		dispatch({
			type: CREATE_INTERVIEW_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: CREATE_INTERVIEW_FAILURE,
				error,
			});

			throw error;
		});
};

export const getInterview = (id, options = { forceGet: true }) => (dispatch, getState, { services }) => {
	let needToLoad = options.forceGet;
	const item = getState().interviews.items.find(i => i.id === id);

	if (!options.forceGet) {

		if (!item) {
			// We need to do a get anyway
			needToLoad = true;
		}
	}

	if (needToLoad) {
		dispatch({
			type: GET_INTERVIEW_LOADING,
		});

		return services.api.interviews.get(id).then(response => {
			dispatch({
				type: GET_INTERVIEW_SUCCESS,
				item: response,
			});
			return response;
		})
			.catch(error => {
				services.Logger.error(error);
				dispatch({
					type: GET_INTERVIEW_FAILURE,
					error,
				});

				throw error;
			});
	}
	dispatch({
		type: GET_INTERVIEW_SUCCESS,
		item,
	});
	return Promise.resolve(item);

};

export const updateInterview = (id, data) => (dispatch, getState, { services }) => {
	dispatch({
		type: UPDATE_INTERVIEW_LOADING,
		id,
	});

	return services.api.interviews.update(id, data).then(response => {
		dispatch({
			type: UPDATE_INTERVIEW_SUCCESS,
			id,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_INTERVIEW_FAILURE,
				id,
				error,
			});

			return error;
		});
};

/**
 * Add or remove a notebook from an interview
 *
 * @param {String} action
 * @param {String} notebookId
 * @param {String} interviewId
 */
export const modifyInterviewNotebooks = (action, interviewId, notebookId) => async () => {
	let data = {};

	const interview = await getInterview(interviewId, {
		forceGet: false,
	});

	switch (action) {
	case 'addNotebookToInterview': {
		const ids = new Set(interview.notebookIds);
		ids.add(notebookId);
		data = {
			notebookIds: Array.from(ids),
		};
		break;
	}
	case 'removeNotebookFromInterview':
		data = {
			notebookIds: interview.notebookIds && interview.notebookIds.filter((id) => {
				return notebookId !== id;
			}),
		};
		break;
	default:
		break;
	}

	return updateInterview(interviewId, data);
};

export const deleteInterview = (id, data) => (dispatch, getState, { services }) => {
	dispatch({
		type: DELETE_INTERVIEW_LOADING,
		id,
	});

	return services.api.interviews.delete(id, data).then(response => {
		dispatch({
			type: DELETE_INTERVIEW_SUCCESS,
			id,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: DELETE_INTERVIEW_FAILURE,
				id,
				error,
			});

			return error;
		});
};
