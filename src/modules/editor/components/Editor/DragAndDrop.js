import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import isAudio from 'modules/medias/utilities/isAudio';

const Wrapper = styled.div`
	/* a little hack to have a small area to drop in */
	min-height: 50vh;
	
    ${({ active }) => active && css`
        background-color: #67b8eb;
    `}
`;

const DragAndDrop = ({ children, editor, createMedia, sendMedia }) => {
	const onDrop = useCallback(async acceptedFiles => {
		const file = acceptedFiles[0];

		const audio = isAudio(file.type);

		const media = await createMedia({
			action: audio ? 'transcribe' : '',
			status: 'uploading',
			fileType: file.type || 'application/octet-stream',
			filename: file.name,
		});

		sendMedia(media.id, file);

		editor.insertBlock({
			type: 'media',
			data: {
				id: media.id,
			},
		});
	}, [createMedia, editor, sendMedia]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		noClick: true,
		onDrop,
	});

	return (
		<Wrapper active={isDragActive} {...getRootProps()}>
			<input {...getInputProps()} />

			{children}
		</Wrapper>
	);
};

export default DragAndDrop;
