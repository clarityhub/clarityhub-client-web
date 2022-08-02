import { useCallback } from 'react';
import Color from 'color';

const averageColor = (colors) => {
	const c = Color('#' + colors[0]);
	const mixed = colors.reduce((acc, color, i) => {
		/* We already mixed in the first index, skip it */
		if (i !== 0) {
			return acc.mix(Color('#' + color));
		}

		return acc;
	}, c);

	return mixed.hex();
};

// Refactor getInlines
const getInlines = (editor, type) => {
	const { value } = editor;
	return value.inlines.find(node => node.type === type);
};

function wrapTag(editor, obj) {
	editor.wrapInline({
		type: 'tag',
		data: obj,
	});
}

function unwrapTag(editor) {
	editor.unwrapInline('tag');
}

const createHighlight = (editor, blockMutation, block, data) => {
	const { value } = editor;

	const obj = {
		color: averageColor(data.tags.map(t => t.color)),
		data,
	};

	if (blockMutation) {
		// Update block with data
		const json = block.toJSON();
		editor.setNodeByKey(block.key, {
			...json,
			data: {
				...json.data,
				...obj,
			},
		});
	} else {
		const highlight = getInlines(editor, 'tag');

		if (value.selection.isExpanded) {
			if (highlight) {
				editor.setInlines({
					type: 'tag',
					data: obj,
				});
			} else {
				editor.command(wrapTag, obj);
			}
		}
	}

};

const removeHighlight = (editor, blockMutation, block) => {
	if (blockMutation) {
		// Update block with data
		const json = block.toJSON();

		editor.setNodeByKey(block.key, {
			...json,
			data: {
				...json.data,
				color: null,
				data: null,
			},
		});
	} else {
		editor.command(unwrapTag);
	}
};

export default function useTags({
	editor,
	referencePath,
	itemType,
	itemId,
	currentTags,
	activeTags,
	blockMutation = false,
	block = null,
}) {
	const onAdd = useCallback(async (tag, createTagItem) => {
		const tagItem = await createTagItem({
			type: itemType,
			itemId,

			preview: editor.value.fragment.text,
			tagPath: tag.tagPath,
			referencePath, // reference to a parent object (unrelated to tags)
		});

		if (tagItem) {
			createHighlight(editor, blockMutation, block, {
				itemId,
				tags: [...currentTags, tag],
				activeTags: [...activeTags, tagItem],
			});
		}
	}, [activeTags, block, blockMutation, currentTags, editor, itemId, itemType, referencePath]);

	const onRemove = useCallback(async (tag, removeTagItem) => {
		const itemTagPath = `${itemType}:${itemId}:${tag.tagPath}`;

		const nextTags = currentTags.filter((t) => {
			return t.tagPath !== tag.tagPath;
		});
		const nextActiveTags = activeTags.filter((t) => {
			return t.tagPath !== tag.tagPath;
		});

		await removeTagItem(itemTagPath);

		if (nextActiveTags.length === 0) {
			removeHighlight(editor, blockMutation, block);
		} else {
			createHighlight(editor, blockMutation, block, {
				itemId,
				tags: nextTags,
				activeTags: nextActiveTags,
			});
		}
	}, [activeTags, block, blockMutation, currentTags, editor, itemId, itemType]);

	return { onAdd, onRemove };
}
