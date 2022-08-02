import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
	getAll,
} from '../store/actions';
import TagList from '../components/TagList';

const TagListContainer = ({
	activeTags = [],
	loading,
	hasLoadedAll,
	items,
	error,

	getAll,
	getTagItems,

	itemType,
	itemId,
}) => {
	useEffect(() => {
		if (!hasLoadedAll && !loading) {
			getAll();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<TagList
			activeTags={activeTags}
			tags={items}
			loading={loading}
			error={error}

			noAdd
		/>
	);
};

const mapStateToProps = (state, props) => {
	const key = `${props.itemType}:${props.itemId}`;
	const tagItems = state.tags.tagItems.items[key] || {};

	return {
		loading: state.tags.tags.isLoading,
		hasLoadedAll: state.tags.tags.hasLoadedAll,
		items: state.tags.tags.items,
		activeTags: tagItems.items || [],
		error: state.tags.tags.error,
	};
};

const mapDispatchToProps = {
	getAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagListContainer);
