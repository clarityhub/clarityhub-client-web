import React from 'react';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { CardBody, CardActions } from '@clarityhub/unity-web/lib/components/Card';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import Button from '@clarityhub/unity-web/lib/components/Button';
import ButtonSet from '@clarityhub/unity-web/lib/components/ButtonSet';
import { useLocale } from '@clarityhub/unity-web/lib/contexts/Localization';

const DeleteInterviewModal = ({
	onClose,
	onDelete,
	interview,
}) => {
	const [locale] = useLocale();

	return (
		<Modal open onClose={onClose}>
			<CardBody>
				<Typography type="h3">Delete Interview?</Typography>
				<Typography type="h4">{interview.title}, last updated {new Date(interview.updatedAt).toLocaleDateString(locale)}</Typography>
				<Typography type="text" color="danger">This action is permanent! Are you sure you want to delete this interview?</Typography>

				<CardActions>
					<ButtonSet spread>
						<Button onClick={onClose}>
                            No, Close
						</Button>
						<Button
							outline
							type="danger"
							onClick={onDelete(interview.id)}
						>
                            Yes, Delete Interview
						</Button>
					</ButtonSet>
				</CardActions>
			</CardBody>
		</Modal>
	);
};

export default DeleteInterviewModal;
