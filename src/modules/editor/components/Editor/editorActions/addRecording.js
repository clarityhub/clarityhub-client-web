import createAudioRecordingDetails from 'modules/medias/utilities/createAudioRecordingDetails';

export default async function record({ createMedia, editor }, action = 'setBlocks') {
	// This is a special version of the media item.
	const media = await createMedia(createAudioRecordingDetails());

	editor[action]({
		type: 'media',
		data: {
			id: media.id,
		},
	});

	editor.focus().moveToStartOfNextBlock();
}
