import React from 'react';
import Editor from '../../editor/components/Editor';

const TranscriptionEditor = ({ media, onChange }) => {
	return (
		<Editor
			initialContent={media.transcript}
			referencePath={`transcript:${media.mediaId}`}
			placeholder="No transcript found"
			onChange={onChange}
			disableSidebar
			minimalActions
			modifyInterview={() => {}}
		/>
	);
};

export default TranscriptionEditor;
