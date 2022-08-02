import { Interview } from 'modules/interviews/utilities/types';
import { Notebook } from 'modules/notebooks/utilities/types';

export default function sortNewestToOldest(items: Interview[] | Notebook[]): Interview[] | Notebook[] {
	return [...items].sort((a, b) => {
		const aDate = new Date(a.createdAt);
		const bDate = new Date(b.createdAt);
		return bDate.valueOf() - aDate.valueOf();
	});
}
