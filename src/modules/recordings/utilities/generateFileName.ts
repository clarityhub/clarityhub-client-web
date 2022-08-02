export interface FileNameProperties {
	fileExtension?: string,
}

export default function generateFileName({ fileExtension }: FileNameProperties = {}) {
	const today = new Date();
	return `recording–${Number(today)}.${fileExtension || 'wav'}`;
}
