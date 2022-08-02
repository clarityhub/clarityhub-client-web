export default function mergeItems(items, newItem, accessor = 'id') {
	const index = items.findIndex(i => i[accessor] === newItem[accessor]);

	if (index === -1) {
		return [newItem, ...items];
	}

	return [...items.slice(0, index), newItem, ...items.slice(index + 1)];
}
