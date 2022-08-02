import React from 'react';

import RecordPanel from 'modules/recordings/containers/RecordPanel';

import isAudio from '../utilities/isAudio';
import AudioPanel from './mediaTypes/AudioPanel';
import DefaultPanel from './mediaTypes/DefaultPanel';
import ImagePanel from './mediaTypes/ImagePanel';
import UploadingPanel from './mediaTypes/UploadingPanel';

const MediaPanel = ({ referencePath, mediaData, media, onUpdateMedia, onViewMedia, tagInfo }) => {
	if (media.meta && media.status === 'uploading') {
		return <UploadingPanel media={media} />;
	}

	if (media.status === 'recording') {
		return (
			<RecordPanel mediaId={media.id} referencePath={referencePath} />
		);
	}

	if (isAudio(media.fileType)) {
		return (
			<AudioPanel onViewMedia={onViewMedia} media={media} tagInfo={tagInfo} />
		);
	}

	if (media.fileType && media.fileType.indexOf('image/') === 0) {
		return (
			<ImagePanel mediaData={mediaData} onUpdateMedia={onUpdateMedia} onViewMedia={onViewMedia} media={media} tagInfo={tagInfo} />
		);
	}

	return (
		<DefaultPanel media={media} tagInfo={tagInfo} />
	);
};

export default MediaPanel;
