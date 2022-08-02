export const DEFAULT_NODE = 'paragraph';

export const hasBlock = (editor, type) => {
	const { value } = editor;
	return value.blocks.some(node => node.type === type);
};
