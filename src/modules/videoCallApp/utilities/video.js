export const trackpubsToTracks = (trackMap) => Array.from(trackMap.values())
	.map((publication) => publication.track)
	.filter((track) => track !== null);
