import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import {
	getAll,
	create,
	getTagItems,
	createTagItem,
	deleteTagItem,
} from '../store/actions';
import TagList from '../components/TagList';

const TagListContainer = ({
	activeTags = [],
	loading,
	hasLoadedAll,
	items,
	error,

	getAll,
	create,
	getTagItems,
	createTagItem,
	deleteTagItem,

	itemType,
	itemId,
	itemPreview,
}) => {
	useEffect(() => {
		if (!hasLoadedAll) {
			getAll();
		}

		getTagItems(itemType, itemId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getAll, getTagItems, itemId, itemType]);

	const onCreate = useCallback((payload) => {
		return create(payload);
	}, [create]);

	const onAdd = useCallback((payload) => {
		return createTagItem({
			type: itemType,
			itemId,
			preview: itemPreview,
			tagPath: payload.tagPath,
		});
	}, [createTagItem, itemId, itemPreview, itemType]);

	const onRemove = useCallback((payload) => {
		const itemTagPath = `${itemType}:${itemId}:${payload.tagPath}`;
		return deleteTagItem(itemTagPath);
	}, [deleteTagItem, itemId, itemType]);

	return (
		<TagList
			activeTags={activeTags}
			tags={items}
			loading={loading}
			error={error}
			onCreate={onCreate}
			onAdd={onAdd}
			onRemove={onRemove}
		/>
	);
};

const mapStateToProps = (state, props) => {
	const key = `${props.itemType}:${props.itemId}`;
	const tagItems = state.tags.tagItems.items[key] || {};

	return {
		loading: !state.tags.tags.hasLoadedAll,
		hasLoadedAll: state.tags.tags.hasLoadedAll,
		items: state.tags.tags.items,
		activeTags: tagItems.items || [],
		error: state.tags.tags.error,
	};
};

const mapDispatchToProps = {
	getAll,
	create,
	getTagItems,
	createTagItem,
	deleteTagItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagListContainer);
