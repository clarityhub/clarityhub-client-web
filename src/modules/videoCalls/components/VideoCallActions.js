import React, { Fragment, useState } from 'react';
import Button from '@clarityhub/unity-web/lib/components/Button';
import ButtonSet from '@clarityhub/unity-web/lib/components/ButtonSet';

import DeleteVideoCallModal from './DeleteVideoCallModal';
import EditVideoCallModal from './EditVideoCallModal';

const VideoCallActions = ({
	parentId,
	videoCall,
	startSession,
	endSession,
	joinSession,
	deleteVideoCall,
	updateInterview,
	updateVideoCall
}) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);

	const handleDelete = (id) => async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await deleteVideoCall(id);
		await updateInterview(parentId, {
			action: null,
		});
		setShowDeleteModal(false);
	};

	const handleSubmit = async (data) => {
		await updateVideoCall(videoCall.id, data);
		setShowEditModal(false);
	};

	let content = null;

	switch (videoCall.status) {
	case 'COMPLETE':
		content = null;
		break;
	case 'ACTIVE':
		content = (
			<Fragment>
				<Button type="primary" outline onClick={() => joinSession(videoCall.id)}>Join Video Call</Button>
				<Button type="danger" onClick={() => endSession(videoCall.id)}>End Video Call</Button>
			</Fragment>
		);
		break;
	case 'NOT_STARTED':
		content = <Fragment>
			<Button type="primary" onClick={() => startSession(videoCall.id)}>Start Video Call</Button>
			<Button outline type="primary" onClick={() => setShowEditModal(true)}>Edit Room Details</Button>
			<Button type="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
		</Fragment>;
		break;
	default:
		content = null;
	}

	return (
		<Fragment>
			<ButtonSet>
				{content}
			</ButtonSet>
			{showDeleteModal &&
				<DeleteVideoCallModal videoCall={videoCall} onClose={() => setShowDeleteModal(false)} onDelete={handleDelete} />
			}
			{showEditModal &&
				<EditVideoCallModal videoCall={videoCall} onClose={() => setShowEditModal(false)} onSubmit={handleSubmit} />
			}
		</Fragment>
	);
};

export default VideoCallActions;
