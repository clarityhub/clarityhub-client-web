export default function generateTitle({ prefix, locale } = {}) {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const today = new Date();

	if (prefix) {
		return `Notebook for ${prefix}`;
	}

	return `Notebook – ${today.toLocaleDateString(locale || 'en-US', options)}`;
}
