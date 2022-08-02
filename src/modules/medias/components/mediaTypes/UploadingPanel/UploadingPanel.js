import React from 'react';
import Card, {
	CardBody,
} from '@clarityhub/unity-web/lib/components/Card';
import ProgressBar from '@clarityhub/unity-web/lib/components/ProgressBar';
import Badge from '@clarityhub/unity-web/lib/components/Badge';

const UploadState = ({ media }) => {
	switch (media.meta.status) {
	case 'error':
		return (
			<ProgressBar primary progress={media.meta.progress} type="danger">
				<Badge type="danger">Upload Failed</Badge>
			</ProgressBar>
		);
	case 'uploading':
	default:
		return (
			<ProgressBar primary progress={media.meta.progress} type="default">
				<Badge type="default">Uploading</Badge>
			</ProgressBar>
		);
	}
};

const UploadingPanel = ({ media }) => {
	return (
		<Card>
			<CardBody>
				<UploadState media={media} />
			</CardBody>
		</Card>
	);
};

export default UploadingPanel;
