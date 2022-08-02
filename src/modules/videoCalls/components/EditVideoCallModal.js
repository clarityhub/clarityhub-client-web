import React, { useCallback } from 'react';
import { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import Button from '@clarityhub/unity-web/lib/components/Button';

import VideoCallForm from './VideoCallForm';

const EditVideoCallModal = ({ onClose, onSubmit, videoCall }) => {
	const handleSubmit = useCallback((formData) => {
		return onSubmit({
			publicName: formData.videoName,
			password: formData.videoPassword,
		});
	}, [onSubmit]);

	return (
		<Modal open onClose={onClose}>
			<CardBody>
				<VideoCallForm
					initialFormData={{
						videoName: videoCall.publicName,
						videoPassword: videoCall.password,
					}}
					onSubmit={handleSubmit}
					additionalButtons={() => (
						<Button onClick={onClose}>
							Cancel
						</Button>
					)}
				/>
			</CardBody>
		</Modal>
	);
};

export default EditVideoCallModal;
