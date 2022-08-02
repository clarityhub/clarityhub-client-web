import flatten from 'lodash.flatten';
import { Tag } from './types';

export default function mergeTags(tagsArray: Tag[]) {
	const tags = flatten(tagsArray);
	const topTags: any = {};

	tags.forEach((tag: any) => {
		if (topTags[tag.tagPath]) {
			topTags[tag.tagPath].count += 1;
		} else {
			topTags[tag.tagPath] = {
				...tag,
				count: 1,
			};
		}
	});

	const sorted = Object.values(topTags).sort((a: any, b: any) => a.count > b.count ? 1 : -1);

	return sorted.slice(0, 3);
}
