import React, { useCallback } from 'react';
import { types } from '@clarityhub/unity-web/lib/theme/fonts';
import Blockquote from '@clarityhub/unity-web/lib/components/Blockquote';
import { OrderedList, UnorderedList, ListItem } from '@clarityhub/unity-web/lib/components/List';
import styled from '@emotion/styled';

import MediaPanel from 'modules/medias/containers/MediaPanel';
import InterviewPanelContainer from 'modules/interviews/containers/InterviewPanelContainer';
import TranscriptionPanel from 'modules/medias/components/TranscriptionPanel';

import useTags from './editorActions/useTags';

const Heading1 = styled.h2`
	${types.heading}
	padding: 0;
	margin: 0;
`;

const Heading2 = styled.h2`
	${types.heading}
	padding: 0;
	margin: 0;

	font-size: 1.2rem;
`;

const BlockquoteWrapper = styled.div`
	margin-left: 2rem;
`;

const Separator = styled.hr`
	border-top: 1px solid #333;
	height: 0;
	width: 40%;
	margin: 2rem auto;
`;

function mapToObj(strMap) {
	let obj = Object.create(null);
	for (let [k, v] of strMap) {
		// We don’t escape the key '__proto__'
		// which can cause problems on older engines
		obj[k] = v;
	}
	return obj;
}

const MediaPanelHelper = ({ node, editor, referencePath, notebookId, ...props }) => {
	const { data } = node;
	const id = data.get('id');
	const nestedData = data.get('data') || {};
	const itemType = 'media';
	const color = data.get('color');
	const currentTags = nestedData.tags || [];
	const activeTags = nestedData.activeTags || [];
	const mediaData = Object.fromEntries(data);

	const onUpdateMedia = useCallback((nextMedia) => {
		editor.setNodeByKey(node.key, nextMedia);
	}, [editor, node.key]);

	const { onAdd, onRemove } = useTags({
		editor,
		referencePath,
		itemType,
		itemId: id,
		currentTags,
		activeTags,
		blockMutation: true,
		block: node,
	});

	return (
		<MediaPanel
			{...props}
			editor={editor}
			mediaId={id}
			referencePath={`/notebooks/${notebookId}`}
			onUpdateMedia={onUpdateMedia}
			mediaData={mediaData}

			tagInfo={{
				color,
				activeTags,
				onAdd,
				onRemove,
			}}
		/>
	);
};

const InterviewPanelHelper = ({ node, editor, ...props }) => {
	const { data } = node;
	const id = data.get('id');

	return (
		<InterviewPanelContainer
			{...props}
			editor={editor}
			interviewId={id}
		/>
	);
};

const blockRenderer = ({ notebookId, referencePath }) => (props, editor, next) => {
	const { attributes, children, node } = props;

	switch (node.type) {
	case 'block-quote':
		return (
			<BlockquoteWrapper>
				<Blockquote {...attributes}>{children}</Blockquote>
			</BlockquoteWrapper>
		);
	case 'bulleted-list':
		return <UnorderedList {...attributes}>{children}</UnorderedList>;
	case 'heading-one':
		return <Heading1 {...attributes}>{children}</Heading1>;
	case 'heading-two':
		return <Heading2 {...attributes}>{children}</Heading2>;
	case 'list-item':
		return <ListItem {...attributes}>{children}</ListItem>;
	case 'numbered-list':
		return <OrderedList {...attributes}>{children}</OrderedList>;
	case 'separator':
		return <Separator {...attributes} />;
	case 'media':
		return (
			<MediaPanelHelper
				editor={editor}
				node={node}
				referencePath={referencePath}
				notebookId={notebookId}
				{...attributes}
			/>
		);
	case 'interview':
		return (
			<InterviewPanelHelper
				editor={editor}
				node={node}
				referencePath={referencePath}
				notebookId={notebookId}
				{...attributes}
			/>
		);
	case 'transcript':
		return <TranscriptionPanel attributes={attributes} type={node.type} data={mapToObj(node.data)}>{children}</TranscriptionPanel>;
	default:
		return next();
	}
};

export default blockRenderer;
