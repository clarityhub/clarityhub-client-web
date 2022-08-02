import React, { useCallback, useState } from 'react';
import { action } from '@storybook/addon-actions';

import TagEditor from './TagEditor';

export default {
	title: 'TagEditor',
};

const ACTIVE_TAGS = [
	{
		itemTagPath: 'interview:1/A:B',
		tagItemPath: 'A:B/interview:1',
		itemId: '1',
		itemPreview: 'Title',
		tagPath: 'A:B',
	},
];

const TAGS = [
	{
		tagPath: 'A',
		tagId: 'A',
		tag: 'Products',
		parentTagId: '',
		color: '110011',
	},
	{
		tagPath: 'A:B',
		tagId: 'B',
		tag: 'Persato',
		parentTagId: 'A',
		color: 'AA0000',
	},
	{
		tagPath: 'A:C',
		tagId: 'C',
		tag: 'CHAPI',
		parentTagId: 'A',
		color: 'AA00AA',
	},
	{
		tagPath: 'P',
		tagId: 'P',
		tag: 'Personas',
		parentTagId: '',
		color: '888822',
	},
	{
		tagPath: 'P:1234',
		tagId: '1234',
		tag: 'Product Manager',
		parentTagId: 'P',
		color: '00FF00',
	},
	{
		tagPath: 'P:C123',
		tagId: 'C123',
		tag: 'Entrepreneur',
		parentTagId: 'P',
		color: '00AAAA',
	},
];

export const defaultTags = () => (
	<div style={{
		boxShadow: '0 3px 18px rgba(10, 10, 10, 0.1)',
		maxWidth: '300px',
		borderRadius: '4px',
	}}>
		<TagEditor
			activeTags={ACTIVE_TAGS}
			tags={TAGS}
			onAddTag={action('add tag')}
			onCreateTag={action('create tag')}
			onRemoveTag={action('remove tag')}
		/>
	</div>
);

export const empty = () => (
	<div style={{
		boxShadow: '0 3px 18px rgba(10, 10, 10, 0.1)',
		maxWidth: '300px',
		borderRadius: '4px',
	}}>
		<TagEditor
			activeTags={[]}
			tags={[]}
			onAddTag={action('add tag')}
			onCreateTag={action('create tag')}
			onRemoveTag={action('remove tag')}
		/>
	</div>
);

export const WiredDemo = () => {
	const [tags, setTags] = useState([]);
	const [activeTags, setActiveTags] = useState([]);
	const createAction = action('create action');
	const addAction = action('add action');
	const removeAction = action('remove action');
	const stateAction = action('state');

	const onAddTag = useCallback(({ color, parentTagId, tag, tagId, tagPath }) => {
		addAction({ tagPath });
		const t = {
			itemTagPath: `interview:1/${tagPath}`,
			tagItemPath: `${tagPath}/interview:1`,
			itemId: '1',
			itemPreview: 'Title',
			tagPath: `${tagPath}`,
		};

		setActiveTags([...activeTags, t]);

		return Promise.resolve(t);
	}, [activeTags, addAction]);

	const onCreateTag = useCallback(({ parentTagId, tag }) => {
		createAction({ parentTagId, tag });
		const tagId = new Date().valueOf();
		const t = {
			tagPath: `${parentTagId ? `${parentTagId}:` : ''}${tagId}`,
			parentTagId,
			tagId,
			tag,
			color: 'FF0000',
		};

		setTags([...tags, t]);

		return Promise.resolve(t);
	}, [createAction, tags]);

	const onRemoveTag = useCallback(({ tagPath }) => {
		removeAction({ tagPath });
		setActiveTags(activeTags.filter(t => t.tagPath !== tagPath));
	}, [activeTags, removeAction]);


	stateAction(tags, activeTags);

	return (
		<div style={{
			boxShadow: '0 3px 18px rgba(10, 10, 10, 0.1)',
			maxWidth: '300px',
			borderRadius: '4px',
		}}>
			<TagEditor
				activeTags={activeTags}
				tags={tags}
				onAddTag={onAddTag}
				onCreateTag={onCreateTag}
				onRemoveTag={onRemoveTag}
			/>
		</div>
	);
};
