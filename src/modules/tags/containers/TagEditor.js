import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import TagEditor from 'designsystem/TagEditor';

import {
	getAll,
	create,
	getTagItems,
	createTagItem,
	deleteTagItem,
} from '../store/actions';

const TagEditorContainer = ({
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

	onAddTag,
	onRemoveTag,

}) => {
	useEffect(() => {
		if (!hasLoadedAll) {
			getAll();
		}

	}, [getAll, getTagItems, hasLoadedAll]);

	const onCreate = useCallback((payload) => {
		return create(payload);
	}, [create]);

	const onAdd = useCallback((payload) => {
		return onAddTag(payload, createTagItem);
	}, [createTagItem, onAddTag]);

	const onRemove = useCallback((payload) => {
		return onRemoveTag(payload, deleteTagItem);
	}, [deleteTagItem, onRemoveTag]);

	return (
		<TagEditor
			activeTags={activeTags}
			tags={items}
			loading={loading}
			error={error}
			onCreateTag={onCreate}
			onAddTag={onAdd}
			onRemoveTag={onRemove}
		/>
	);
};

const mapStateToProps = (state, props) => {
	return {
		loading: !state.tags.tags.hasLoadedAll,
		hasLoadedAll: state.tags.tags.hasLoadedAll,
		items: state.tags.tags.items,
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

export default connect(mapStateToProps, mapDispatchToProps)(TagEditorContainer);
