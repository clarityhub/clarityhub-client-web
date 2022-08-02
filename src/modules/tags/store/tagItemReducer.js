import mergeItems from 'utilities/mergeItems';
import removeItems from 'utilities/removeItems';
import {
	GET_TAG_ITEMS_LOADING,
	GET_TAG_ITEMS_SUCCESS,
	GET_TAG_ITEMS_FAILURE,
	CREATE_TAG_ITEM_LOADING,
	CREATE_TAG_ITEM_SUCCESS,
	CREATE_TAG_ITEM_FAILURE,
	DELETE_TAG_ITEM_LOADING,
	DELETE_TAG_ITEM_SUCCESS,
	DELETE_TAG_ITEM_FAILURE,
	DELETE_TAG_SUCCESS,
	GET_TAG_ITEMS_PARTIAL,
	GET_TAG_ITEM_STATISTICS_LOADING,
	GET_TAG_ITEM_STATISTICS_SUCCESS,
	GET_TAG_ITEM_STATISTICS_FAILURE,
} from './constants';

const removeTagFromItems = (items, tagPath) => {
	const obj = {};

	Object.keys(items).forEach(key => {
		const oldItem = items[key];
		obj[key] = {
			...oldItem,
			items: removeItems(oldItem.items, tagPath, 'tagPath', function matcher(val, tagPath) {
				return !val.startsWith(tagPath);
			}),
		};
	});

	return obj;
};

export default (state = {
	items: {},
	stats: {},
	error: false,
	hasLoadedStats: false,
	isCreating: false,
	isPatching: false,
}, action = {}) => {
	switch (action.type) {
	/**
	 * Remove references tags
	 */
	case DELETE_TAG_SUCCESS:
		return {
			...state,
			items: removeTagFromItems(state.items, action.item.tags[0].tagPath),
		};
	case GET_TAG_ITEMS_LOADING: {
		const key = `${action.request.type}:${action.request.itemId}`;

		return {
			...state,
			items: {
				...state.items,
				[key]: {
					items: [],
					...state.items[key],
					isReady: false,
					error: false,
				},
			},
		};
	}
	case GET_TAG_ITEMS_PARTIAL: {
		const nextState = {
			...state,
			items: {
				...state.items,
			},
		};
		action.items.forEach((itemSet) => {
			if (itemSet.length === 0) {
				return;
			}

			const key = `${itemSet[0].itemType}:${itemSet[0].itemId}`;

			const oldState = nextState.items[key] || {
				items: [],
			};

			nextState.items[key] = {
				...oldState,
				isReady: true,
				items: itemSet,
			};
		});

		return nextState;
	}
	case GET_TAG_ITEMS_SUCCESS: {
		const key = `${action.request.type}:${action.request.itemId}`;

		return {
			...state,
			items: {
				...state.items,
				[key]: {
					...state.items[key],
					items: action.items,
					isReady: true,
				},
			},
		};
	}
	case GET_TAG_ITEMS_FAILURE: {
		const key = `${action.request.type}:${action.request.itemId}`;

		return {
			...state,
			items: {
				...state.items,
				[key]: {
					...state.items[key],
					isReady: false,
					error: action.error,
				},
			},
		};
	}
	case CREATE_TAG_ITEM_LOADING:
		return {
			...state,
			isCreating: true,
		};
	case CREATE_TAG_ITEM_SUCCESS: {
		const key = `${action.item.itemType}:${action.item.itemId}`;
		const oldState = state.items[key] || {
			items: [],
		};

		return {
			...state,
			isCreating: false,
			items: {
				...state.items,
				[key]: {
					...oldState,
					items: mergeItems(oldState.items, action.item, 'itemTagPath'),
					error: false,
					isReady: true,
				},
			},
		};
	}
	case CREATE_TAG_ITEM_FAILURE:
		return {
			...state,
			isCreating: false,
			error: action.error,
		};
	case DELETE_TAG_ITEM_LOADING:
		return {
			...state,
			isPatching: true,
		};
	case DELETE_TAG_ITEM_SUCCESS: {
		const key = `${action.item.itemType}:${action.item.itemId}`;
		const oldState = state.items[key] || {
			items: [],
		};
		return {
			...state,
			error: false,
			isPatching: false,
			items: {
				...state.items,
				[key]: {
					...oldState,
					items: removeItems(oldState.items, action.item.itemTagPath, 'itemTagPath'),
					error: false,
					isReady: true,
				},
			},
		};
	}
	case DELETE_TAG_ITEM_FAILURE:
		return {
			...state,
			isPatching: false,
			error: action.error,

		};
	case GET_TAG_ITEM_STATISTICS_LOADING:
		return {
			...state,
			hasLoadedStats: false,
			error: null,
		};
	case GET_TAG_ITEM_STATISTICS_SUCCESS:
		return {
			...state,
			hasLoadedStats: true,
			stats: action.items,
			error: action.error,
		};
	case GET_TAG_ITEM_STATISTICS_FAILURE:
		return {
			...state,
			hasLoadedStats: false,
			error: action.error,
		};
	default:
		return state;
	}
};
