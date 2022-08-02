import React, { useCallback, useState, useEffect } from 'react';
import styled from '@emotion/styled';

import TagSearch from './TagSearch';
import ActiveTags from './ActiveTags';
import TagList from './TagList';
import TagForm from './TagForm';
import pickColor from './utilities/pickColor';

const filterTags = (tags, filter) => {
	return tags.filter((tag) => {
		return tag.tag.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
	});
};

const TagEditorScroll = styled.div`
	min-height: 150px;
	overflow: auto;
	max-height: 300px;
`;

const TagEditor = ({
	activeTags,
	tags,
	onAddTag,
	onCreateTag,
	onRemoveTag,
}) => {
	const [filteredTags, setFilteredTags] = useState(tags);
	const [parent, setParent] = useState(undefined);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		setFilteredTags(tags);
	}, [tags, activeTags]);

	const onFilter = useCallback((text) => {
		setFilteredTags(filterTags(tags, text));

		setFilter(text);
	}, [tags]);

	const onExpand = useCallback((tag) => {
		if (!tag) {
			setParent(undefined);
		}

		setParent(tag);
	}, []);

	const onRemove = useCallback((tag) => {
		onRemoveTag(tag);
	}, [onRemoveTag]);

	const onAdd = useCallback((tag) => {
		return onAddTag(tag);
	}, [onAddTag]);

	const onCreate = useCallback(async (text, parent) => {
		const tag = await onCreateTag({
			tag: text,
			parentTagId: parent && parent.tagId ? parent.tagId : undefined,

			// Use the parent's color if there is a parent
			color: parent ? parent.color : pickColor(text),
		});

		if (parent) {
			await onAddTag(tag);
		} else {
			setParent(tag);
		}
	}, [onAddTag, onCreateTag]);

	return (
		<div>
			<TagSearch
				filter={filter}
				onFilter={onFilter}
			/>

			<TagEditorScroll>
				{!parent && (
					<ActiveTags
						activeTags={activeTags}
						tags={tags}
						onRemove={onRemove}
					/>
				)}

				<TagList
					onExpand={onExpand}
					onAdd={onAdd}
					onRemove={onRemove}
					parent={parent}
					activeTags={activeTags}
					tags={filteredTags}
					listLeafs={filter}
				/>
			</TagEditorScroll>

			<TagForm
				parent={parent}
				onCreateTag={onCreate}
				suggestedTag={filter}
			/>
		</div>
	);
};

export default TagEditor;
