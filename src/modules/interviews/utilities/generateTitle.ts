export interface TitleOptions {
    locale?: string;
}

export default function generateTitle({ locale }: TitleOptions = {}): string {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const today = new Date();
	return `Interview – ${today.toLocaleDateString(locale || 'en-US', options)}`;
}
