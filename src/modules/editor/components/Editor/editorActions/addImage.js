import { DEFAULT_NODE, hasBlock } from './utilities';

export default function record({ createMedia, sendMedia, editor }) {
	// TODO refactor with Drag and Drop
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'image/*';
	input.onchange = async e => {
		const isActive = hasBlock(editor, 'picture');

		const file = e.target.files[0];

		const media = await createMedia({
			action: '',
			status: 'uploading',
			fileType: file.type || 'application/octet-stream',
			filename: file.name,
		});

		sendMedia(media.id, file);

		editor.setBlocks(isActive ? DEFAULT_NODE : {
			type: 'media',
			data: {
				id: media.id,
			},
		});

		editor.focus().moveToStartOfNextBlock();
	};
	input.click();
}
