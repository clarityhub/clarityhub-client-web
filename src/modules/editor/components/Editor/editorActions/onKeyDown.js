/* eslint consistent-return:0 */
import { isKeyHotkey } from 'is-hotkey';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');
const isUndo = isKeyHotkey('mod+z');
const isRedo = isKeyHotkey('mod+y');
const isRedo2 = isKeyHotkey('mod+shift+z');

function getType(chars) {
	switch (chars) {
	case '*':
	case '-':
		return 'list-item';
	case '1.':
		return 'numbered-list-item';
	case '>':
		return 'block-quote';
	case '#':
		return 'heading-one';

	default:
		return null;
	}
}

function onSpace(event, editor, next) {
	const { value } = editor;
	const { selection } = value;
	if (selection.isExpanded) {
		return next();
	}

	const { startBlock } = value;
	const { start } = selection;
	const chars = startBlock.text.slice(0, start.offset).replace(/\s*/gu, '');
	const type = getType(chars);
	if (!type) {
		return next();
	}
	if (type === 'list-item' && startBlock.type === 'list-item') {
		return next();
	}
	event.preventDefault();

	if (type === 'numbered-list-item') {
		editor.setBlocks('list-item');
		editor.wrapBlock('numbered-list');
	} else {
		editor.setBlocks(type);

		if (type === 'list-item') {
			editor.wrapBlock('bulleted-list');
		}
	}

	editor.moveFocusToStartOfNode(startBlock).delete();
}

function onBackspace(event, editor, next) {
	const { value } = editor;
	const { selection } = value;

	if (selection.isExpanded) {
		return next();
	}
	if (selection.start.offset !== 0) {
		return next();
	}

	const { startBlock, previousBlock } = value;

	if (previousBlock && ['media', 'interview', 'separator'].includes(previousBlock.type)) {
		event.preventDefault();
		editor.moveFocusToStartOfNode(previousBlock).deleteForward();
		return;
	}

	if (startBlock.type === 'paragraph') {
		return next();
	}

	event.preventDefault();
	editor.setBlocks('paragraph');

	if (startBlock.type === 'list-item') {
		editor.unwrapBlock('bulleted-list');
	}
}

function onEnter(event, editor, next) {
	const { value } = editor;
	const { selection } = value;
	const { end, isExpanded } = selection;
	if (isExpanded) {
		return next();
	}

	const { startBlock } = value;

	// if (start.offset === 0 && startBlock.text.length === 0) {
	// 	console.log('Enter would have resulted in a backspace for some reason...');
	// 	// return onBackspace(event, editor, next);
	// }

	if (end.offset !== startBlock.text.length) {
		return next();
	}

	if (
		startBlock.type !== 'heading-one' &&
		startBlock.type !== 'block-quote'
	) {
		return next();
	}

	event.preventDefault();
	editor.splitBlock().setBlocks('paragraph');
}

export default function onKeyDown(event, editor, next) {
	let mark;

	if (event.key === 'Enter' && !event.shiftKey) {
		if (['separator', 'block-quote', 'heading-one', 'heading-two', 'transcript'].includes(editor.value.startBlock.type)) {
			editor.splitBlock().setBlocks('paragraph');
			event.preventDefault();
			return;
		}

		// TODO If we hit enter on a list, and the list item we are on is empty,
		// unwrap
	}

	// TODO auto make lists  from "1. " and "- "

	if (isUndo(event)) {
		// undo
		editor.undo();
		event.preventDefault();
		return next();
	} else if (isRedo(event) || isRedo2(event)) {
		// redo
		editor.redo();
		event.preventDefault();
		return next();
	} else if (isBoldHotkey(event)) {
		mark = 'bold';
	} else if (isItalicHotkey(event)) {
		mark = 'italic';
	} else if (isUnderlinedHotkey(event)) {
		mark = 'underlined';
	} else if (isCodeHotkey(event)) {
		mark = 'code';
	} else {
		switch (event.key) {
		case ' ':
			return onSpace(event, editor, next);
		case 'Backspace':
			return onBackspace(event, editor, next);
		case 'Enter':
			return onEnter(event, editor, next);
		default:
			return next();

		}
	}

	event.preventDefault();
	editor.toggleMark(mark);
}
