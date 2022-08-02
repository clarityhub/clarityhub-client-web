import React, { useCallback, useState, useRef, useEffect, forwardRef } from 'react';
import styled from '@emotion/styled';
import { types } from '@clarityhub/unity-web/lib/theme/fonts';
import { Editor as SlateEditor, findDOMRange } from 'slate-react';
import { Value } from 'slate';

import isMobile from 'utilities/isMobile';

import onKeyDown from './editorActions/onKeyDown';
import onPaste from './editorActions/onPaste';
// TODO: onPaste as an action

import defaultContent from './defaultContent';
import blockRenderer from './blockRenderer';
import editorRenderer from './editorRenderer';
import markRenderer from './markRenderer';
import inlineRenderer from './inlineRenderer';
import schema from './schema';

const Styling = styled.div`
	${types.text};

	[data-slate-editor] {
		/* padding-right: ${({ minimalActions }) => minimalActions ? '0' : '6rem'}; */
	}

	[data-slate-editor] > * + * {
		margin-top: 1rem;
	}
`;

const toJSON = (content) => {
	if (typeof content === 'string') {
		return JSON.parse(content);
	}
	return content;

};

const noop = () => {};

const Editor = forwardRef(({
	initialContent = defaultContent,
	onChange = noop,
	createMedia,
	sendMedia,
	disableSidebar = false,
	minimalActions = false,
	hideHighlights = false,
	notebookId = -1,
	modifyInterview,
	referencePath,

	deleteTagItem,
	...props
}, ref) => {
	const [hoverMenuTimestamp, setHoverMenuTimestamp] = useState(0);
	const [value, setValue] = useState(Value.fromJSON(toJSON(initialContent)));
	const menuRef = useRef();
	const sidenavRef = useRef();
	const ribbonRef = useRef();

	const onChangeSideEffects = useCallback(async (change) => {
		// Delete interview references
		await Promise.all(
			change.operations
				.filter(op => op.type === 'remove_node' && op.node.type === 'interview')
				.map(operation => {
					return modifyInterview(operation.node.data.get('id'), {
						action: 'removeNotebookFromInterview',
					});
				}),
		);

		// Delete tags
		await Promise.all(
			change.operations
				.filter(op => op.type === 'remove_node' && op.node.type === 'tag')
				.map((operation) => {
					try {
						const data = operation.node.data.get('data');

						return Promise.all(data.activeTags.map(activeTag => {
							// Delete this activeTag
							const { itemTagPath } = activeTag;

							return deleteTagItem(itemTagPath);
						}));
					} catch (e) {
						return e;
					}
				}),
		);

	}, [deleteTagItem, modifyInterview]);

	// Position the Hover Menu
	useEffect(() => {
		const menu = menuRef.current;
		if (!menu) {
			return;
		}

		const { fragment, selection } = value;

		if (/* selection.isBlurred || */ selection.isCollapsed || fragment.text === '') {
			menu.removeAttribute('style');
			return;
		}

		const range = findDOMRange(selection);
		// const native = window.getSelection();
		// const range = native.getRangeAt(0);
		const rect = range.getBoundingClientRect();
		menu.style.opacity = 1;
		menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

		// don't go left of the screen
		const calculatedLeft = rect.left +
			window.pageXOffset -
			menu.offsetWidth / 2 +
			rect.width / 2;

		// don't go right of the screen
		let left = Math.max(calculatedLeft, 2);

		if (calculatedLeft + menu.offsetWidth > document.body.offsetWidth) {
			left = document.body.offsetWidth - menu.offsetWidth - 2;
		}

		menu.style.left = `${left}px`;
		setHoverMenuTimestamp(new Date().valueOf());
	}, [value]);

	// Position the hover sidebar
	useEffect(() => {
		const menu = sidenavRef.current;
		const ribbon = ribbonRef.current;
		if (!menu || !ribbon) {
			return;
		}

		// NOTE We always show the ribbon when on mobile for now
		if (isMobile.any()) {
			ribbon.style.opacity = 1;
			ribbon.style.bottom = 0;
			return;
		}

		const { anchorBlock, fragment, selection } = value;

		if (selection.isBlurred || !anchorBlock) {
			// Don't reset style
			return;
		}

		if (anchorBlock.type !== 'paragraph' || anchorBlock.text !== '' || fragment.text !== '') {
			ribbon.removeAttribute('style');
			menu.removeAttribute('style');
			return;
		}

		const native = window.getSelection();
		const range = native.getRangeAt(0);

		// COMPAT: Safari and Firefox don't provide the correct bounding client rect when
		// there is no selection.
		const container = range.commonAncestorContainer.parentNode;
		const rect = container.getBoundingClientRect();

		ribbon.style.opacity = 1;
		ribbon.style.bottom = 0;
		menu.style.opacity = 1;
		menu.style.top = `${rect.top + window.pageYOffset - 4}px`;
		menu.style.left = `${rect.left +
			window.pageXOffset - 44}px`;
	}, [value]);

	const onEditorChange = useCallback((change) => {
		const { value } = change;

		onChangeSideEffects(change);

		setValue(value);
		onChange(value);
	}, [onChange, onChangeSideEffects]);

	return (
		<Styling minimalActions={minimalActions}>
			<SlateEditor
				key={hideHighlights}
				className={hideHighlights ? 'hideHighlights' : ''}
				spellCheck
				autoFocus
				ref={ref}
				value={value}
				onChange={onEditorChange}
				onKeyDown={onKeyDown}
				onPaste={onPaste}
				renderBlock={blockRenderer({
					notebookId,
					referencePath,
				})}
				renderEditor={editorRenderer({
					ribbonRef,
					menuRef,
					sidenavRef,
					createMedia,
					disableSidebar,
					sendMedia,
					modifyInterview,
					minimalActions,
					referencePath,

					hoverMenuTimestamp,
				})}
				renderInline={inlineRenderer({ hideHighlights })}
				renderMark={markRenderer}
				schema={schema}

				{...props}
			/>
		</Styling>
	);
});

export default Editor;
