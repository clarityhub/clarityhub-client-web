import React from 'react';
import Badge from '@clarityhub/unity-web/lib/components/Badge';

const VideoCallStatusBadge = ({ status }) => {
	switch (status) {
	case 'COMPLETE':
		return <Badge type="default">Complete</Badge>;
	case 'ACTIVE':
		return <Badge type="success">Active</Badge>;
	case 'NOT_STARTED':
		return <Badge type="default">Not Started</Badge>;
	default:
		return <Badge type="default">Unknown Status</Badge>;
	}
};

export default VideoCallStatusBadge;
