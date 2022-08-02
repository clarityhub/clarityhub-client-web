import React from 'react';
import Icon from '@mdi/react';
import StyledButton from './StyledButton';

const DEFAULT_NODE = 'paragraph';

const hasBlock = (editor, type) => {
	const { value } = editor;
	return value.blocks.some(node => node.type === type);
};

const BlockButton = ({ editor, fullWidth, showText, type, readable, icon }) => {
	let isActive = hasBlock(editor, type);

	if (['numbered-list', 'bulleted-list'].includes(type)) {
		const { value: { document, blocks } } = editor;

		if (blocks.size > 0) {
			const parent = document.getParent(blocks.first().key);
			isActive = hasBlock(editor, 'list-item') && parent && parent.type === type;
		}
	}

	return (
		<StyledButton
			fullWidth={fullWidth}
			active={isActive}
			onMouseDown={event => {
				event.preventDefault();

				const { value } = editor;
				const { document } = value;

				// Handle everything but list buttons.
				if (type !== 'bulleted-list' && type !== 'numbered-list') {
					const isActive = hasBlock(editor, type);
					const isList = hasBlock(editor, 'list-item');

					if (isList) {
						editor
							.setBlocks(isActive ? DEFAULT_NODE : type)
							.unwrapBlock('bulleted-list')
							.unwrapBlock('numbered-list');
					} else {
						editor.setBlocks(isActive ? DEFAULT_NODE : type);
					}
				} else {
					// Handle the extra wrapping required for list buttons.
					const isList = hasBlock(editor, 'list-item');
					const isType = value.blocks.some(block => {
						return Boolean(document.getClosest(block.key, parent => parent.type === type));
					});

					if (isList && isType) {
						editor
							.setBlocks(DEFAULT_NODE)
							.unwrapBlock('bulleted-list')
							.unwrapBlock('numbered-list');
					} else if (isList) {
						editor
							.unwrapBlock(
								type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list',
							)
							.wrapBlock(type);
					} else {
						editor.setBlocks('list-item').wrapBlock(type);
					}
				}
			}}
		>
			<Icon
				path={icon}
				color="currentColor"
				title={type}
				size={0.8}
			/>

			{showText && ' ' + readable}
		</StyledButton>
	);
};

export default BlockButton;
