export interface FileNameProperties {
	fileExtension?: string,
}

export default function generateFileName({ fileExtension }: FileNameProperties = {}) {
	const today = new Date();
	return `recordingâ€“${Number(today)}.${fileExtension || 'wav'}`;
}
