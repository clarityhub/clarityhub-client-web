import React from 'react';
import Icon from '@mdi/react';
import StyledButton from './StyledButton';

export const hasInlines = (editor, type) => {
	const { value } = editor;
	return value.inlines.some(node => node.type === type);
};

/**
 * A change helper to standardize wrapping links.
 *
 * @param {Editor} editor
 * @param {String} href
 */

export function wrapLink(editor, href) {
	editor.wrapInline({
		type: 'link',
		data: { href },
	});

	editor.moveToEnd();
}

/**
 * A change helper to standardize unwrapping links.
 *
 * @param {Editor} editor
 */

export function unwrapLink(editor) {
	editor.unwrapInline('link');
}

const createLink = (editor, type) => {
	const { value } = editor;

	const checkHasLinks = hasInlines(editor, type);

	if (checkHasLinks) {
		editor.command(unwrapLink);
	} else if (value.selection.isExpanded) {
		/* eslint-disable-next-line no-alert */
		const href = window.prompt('Enter the URL of the link:');

		if (href === null) {
			return;
		}

		editor.command(wrapLink, href);
	}
};

const InlineButton = ({ editor, type, showText, readable, icon }) => {
	const isActive = hasInlines(editor, type);
	return (
		<StyledButton
			active={isActive}
			onMouseDown={event => {
				event.preventDefault();
				switch (type) {
				case 'link':
				default:
					createLink(editor, type);
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

export default InlineButton;
