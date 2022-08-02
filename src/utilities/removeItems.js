function defaultMatcher(val, match) {
	return val !== match;
}
export default function removeItems(items, keysToRemove, accessor = 'id', matcher = defaultMatcher) {
	let filteredItems = [];

	if (Array.isArray(keysToRemove)) {
		if (keysToRemove.length === 1) {
			filteredItems = items.filter((item) => {
				return item[accessor] !== keysToRemove[0];
			});
		} else {
			filteredItems = items.filter((item) => {
				return keysToRemove.indexOf(item[accessor]) === -1;
			});
		}
	} else {
		filteredItems = items.filter((item) => {
			return matcher(item[accessor], keysToRemove);
		});
	}
	return filteredItems;
}
