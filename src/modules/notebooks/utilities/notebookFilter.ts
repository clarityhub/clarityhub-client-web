import { Notebook } from './types';

export default function notebookFilter(notebook: Notebook, filters: any) {
	if (!filters.text) {
		return true;
	}

	if (notebook.title.toLowerCase().indexOf(filters.text.toLowerCase()) !== -1) {
		return true;
	}

	const tags = notebook.meta && notebook.meta.tags.map(t => t.tag).join(' ');

	if (tags && tags.toLowerCase().indexOf(filters.text.toLowerCase()) !== -1) {
		return true;
	}

	return false;
}
