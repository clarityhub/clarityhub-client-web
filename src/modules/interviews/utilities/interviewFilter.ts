import { Interview } from './types';

export default function interviewFilter(interview: Interview, filters: any) {
	if (!filters.text) {
		return true;
	}

	if (interview.title.toLowerCase().indexOf(filters.text.toLowerCase()) !== -1) {
		return true;
	}

	if (interview.notes.toLowerCase().indexOf(filters.text.toLowerCase()) !== -1) {
		return true;
	}

	const tags = interview.meta.tags.map(t => t.tag).join(' ');

	if (tags.toLowerCase().indexOf(filters.text.toLowerCase()) !== -1) {
		return true;
	}

	return false;
}
