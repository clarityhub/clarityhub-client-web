import {
	GET_MEDIA_LOADING,
	GET_MEDIA_SUCCESS,
	GET_MEDIA_FAILURE,
	CREATE_MEDIA_LOADING,
	CREATE_MEDIA_SUCCESS,
	CREATE_MEDIA_FAILURE,
	UPDATE_MEDIA_LOADING,
	UPDATE_MEDIA_SUCCESS,
	UPDATE_MEDIA_FAILURE,

	MEDIA_FINALIZING,
	MEDIA_UPLOADING,
	MEDIA_UPLOAD_FAILED,
} from './constants';

/**
 * Get a media by its id
 *
 * @param {String} id
 */
export const getMedia = (id) => (dispatch, getState, { services }) => {
	dispatch({
		type: GET_MEDIA_LOADING,
	});

	return services.api.medias.get(id).then((response) => {
		dispatch({
			type: GET_MEDIA_SUCCESS,
			item: response,
		});

		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: GET_MEDIA_FAILURE,
				error,
			});
			throw error;
		});
};

/**
 * Create a new media entity
 *
 * @param {Object} payload
 */
export const createMedia = (payload) => (dispatch, getState, { services }) => {
	dispatch({
		type: CREATE_MEDIA_LOADING,
	});

	return services.api.medias.create(payload).then((response) => {
		dispatch({
			type: CREATE_MEDIA_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: CREATE_MEDIA_FAILURE,
				error,
			});

			throw error;
		});
};

/**
 * Update an existing media entity
 *
 * @param {String} id
 * @param {Object} payload
 */
export const updateMedia = (id, payload) => (dispatch, getState, { services }) => {
	dispatch({
		type: UPDATE_MEDIA_LOADING,
	});

	return services.api.medias.update(id, payload).then((response) => {
		dispatch({
			type: UPDATE_MEDIA_SUCCESS,
			item: response,
		});
		return response;
	})
		.catch(error => {
			services.Logger.error(error);
			dispatch({
				type: UPDATE_MEDIA_FAILURE,
				error,
			});

			throw error;
		});
};

/**
 * Media has been updated via notification.
 *
 * Used by real-time notifications
 *
 * @param {Object} payload
 */
export const updatedMedia = (payload) => {
	return {
		type: UPDATE_MEDIA_SUCCESS,
		item: payload.item,
	};
};

/**
 * Upload a file by requesting an upload URL for the
 * given `mediaId`.
 *
 * @param {String} mediaId
 * @param {File} file
 */
export const sendMedia = (mediaId, file) => async (dispatch, getState, { services }) => {
	dispatch({
		type: MEDIA_FINALIZING,
		mediaId,
	});

	try {
		const media = await services.api.medias.getUploadUrl(mediaId);

		dispatch({
			type: MEDIA_UPLOADING,
			mediaId,
			progress: 0,
		});

		const { presignedUrl, filename, fileType } = media;

		await services.api.medias.upload(presignedUrl, file, filename, fileType, {
			onProgress: (progress) => {
				dispatch({
					type: MEDIA_UPLOADING,
					mediaId,
					progress,
				});
			},
		});

		const newMedia = await services.api.medias.complete(mediaId);

		dispatch({
			type: UPDATE_MEDIA_SUCCESS,
			item: newMedia,
		});

	} catch (error) {
		services.Logger.error(error);
		dispatch({
			type: MEDIA_UPLOAD_FAILED,
			mediaId,
			error,
		});

		throw error;
	}
};
