import React from 'react';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import { CardBody, CardActions } from '@clarityhub/unity-web/lib/components/Card';
import ButtonSet from '@clarityhub/unity-web/lib/components/ButtonSet';
import Button from '@clarityhub/unity-web/lib/components/Button';
import VideoSelectDevice from 'modules/videoCallApp/components/VideoSelectDevice';

const AudioSettingsModal = ({ audioDeviceId, onChangeDevice, isOpen, onClose }) => {
	return (
		<Modal open={isOpen} onClose={onClose}>
			<CardBody>
				<VideoSelectDevice deviceId={audioDeviceId} deviceType="audioinput" onChangeDevice={onChangeDevice} />
				<CardActions>
					<ButtonSet>
						<Button text onClick={onClose}>
                            Close
						</Button>
					</ButtonSet>
				</CardActions>
			</CardBody>
		</Modal>
	);
};

export default AudioSettingsModal;
