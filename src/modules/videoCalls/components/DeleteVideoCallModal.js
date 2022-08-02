import React from 'react';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { CardBody, CardActions } from '@clarityhub/unity-web/lib/components/Card';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import Button from '@clarityhub/unity-web/lib/components/Button';
import ButtonSet from '@clarityhub/unity-web/lib/components/ButtonSet';
import { useLocale } from '@clarityhub/unity-web/lib/contexts/Localization';

const DeleteVideoCallModal = ({ onClose, onDelete, videoCall }) => {
	const [locale] = useLocale();

	return (
		<Modal open onClose={onClose}>
			<CardBody>
				<Typography type="h3">Delete Video Call?</Typography>
				<Typography type="h4">{videoCall.publicName}, last updated {new Date(videoCall.updatedAt).toLocaleDateString(locale)}</Typography>

				<CardActions>
					<ButtonSet spread>
						<Button onClick={onClose}>
							No, Close
						</Button>
						<Button
							outline
							type="danger"
							onClick={onDelete(videoCall.id)}
						>
							Yes, Delete Video Call
						</Button>
					</ButtonSet>
				</CardActions>
			</CardBody>
		</Modal>
	);
};

export default DeleteVideoCallModal;
