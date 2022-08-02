/* eslint consistent-return:0 */
import { getEventTransfer } from 'slate-react';
import isUrl from 'is-url';
import { wrapLink, unwrapLink, hasInlines } from '../menuItems/InlineButton';

/**
 * On paste, if the text is a link, wrap the selection in a link.
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {Function} next
 */
const onPaste = (event, editor, next) => {
	event.preventDefault(); // this prevents the text from appearing twice
	// if (editor.value.selection.isCollapsed) return next();

	const transfer = getEventTransfer(event);
	const { type, text } = transfer;
	if (type !== 'text' && type !== 'html') {
		return next();
	}
	if (!isUrl(text)) {
		return next();
	}

	if (hasInlines(editor, type)) {
		editor.command(unwrapLink);
	}

	editor
		.insertText(text)
		.moveFocusBackward(text.length)
		.command(wrapLink, text);
};

export default onPaste;
