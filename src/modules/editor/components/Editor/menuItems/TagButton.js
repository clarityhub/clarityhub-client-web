import React from 'react';
import Icon from '@mdi/react';
import { mdiTag } from '@mdi/js';
import { Menu } from '@clarityhub/unity-web/lib/components/Menu';
import uuid from 'uuid/v4';

import TagEditor from 'modules/tags/containers/TagEditor';

import useTags from '../editorActions/useTags';
import StyledButton from './StyledButton';

const getInlines = (editor, type) => {
	const { value } = editor;
	return value.inlines.find(node => node.type === type);
};

const TagButton = ({
	editor,

	referencePath,
}) => {
	const highlight = getInlines(editor, 'tag');
	const data = highlight ? highlight.data.get('data') || {} : {};

	const itemType = 'editor';
	const itemId = data.itemId || uuid();
	const currentTags = data.tags || [];
	const activeTags = data.activeTags || [];

	const { onAdd, onRemove } = useTags({
		editor,
		referencePath,
		itemType,
		itemId,
		currentTags,
		activeTags,
	});

	return (
		<Menu
			content={
				<TagEditor
					activeTags={activeTags}
					onAddTag={onAdd}
					onRemoveTag={onRemove}
				/>
			}
		>
			{({ open }) => (
				<StyledButton
					onClick={open}
					editor={editor}
				>
					<Icon
						path={mdiTag}
						color="currentColor"
						title="Tags"
						size={0.8}
					/>
					{' '}
                    Tag
				</StyledButton>
			)}
		</Menu>
	);
};

export default TagButton;
