import mergeItems from 'utilities/mergeItems';
import {
	GET_MEDIA_LOADING,
	GET_MEDIA_SUCCESS,
	GET_MEDIA_FAILURE,
	CREATE_MEDIA_LOADING,
	CREATE_MEDIA_SUCCESS,
	CREATE_MEDIA_FAILURE,
	UPDATE_MEDIA_SUCCESS,

	MEDIA_FINALIZING,
	MEDIA_UPLOADING,
	MEDIA_UPLOAD_FAILED,
} from './constants';

export default (state = {
	items: [],
	error: false,
}, action = {}) => {
	switch (action.type) {
	case GET_MEDIA_LOADING:
		return {
			...state,
			error: false,
		};
	case GET_MEDIA_SUCCESS:
	case UPDATE_MEDIA_SUCCESS:
		return {
			...state,
			error: false,
			items: mergeItems(state.items, action.item),
		};
	case GET_MEDIA_FAILURE:
	case CREATE_MEDIA_FAILURE:
		return {
			...state,
			error: action.error,
		};
	case CREATE_MEDIA_LOADING:
		return {
			...state,
			error: false,
		};
	case CREATE_MEDIA_SUCCESS:
		return {
			...state,
			error: false,
			items: [...state.items, action.item],
		};
	case MEDIA_FINALIZING:
		return {
			...state,
			items: state.items.map((item) => {
				if (item.id === action.mediaId) {
					return {
						...item,
						meta: {
							status: 'uploading',
							progress: 0,
						},
					};
				}
				return item;
			}),
		};
	case MEDIA_UPLOADING:
		return {
			...state,
			items: state.items.map((item) => {
				if (item.id === action.mediaId) {
					return {
						...item,
						meta: {
							status: 'uploading',
							progress: action.progress,
						},
					};
				}
				return item;
			}),
		};
	case MEDIA_UPLOAD_FAILED:
		return {
			...state,
			items: state.items.map((item) => {
				if (item.id === action.mediaId) {
					return {
						...item,
						meta: {
							status: 'error',
							progress: (item.meta && item.meta.progress) || 0,
							error: action.error,
						},
					};
				}
				return item;
			}),
		};
	default:
		return state;
	}
};
