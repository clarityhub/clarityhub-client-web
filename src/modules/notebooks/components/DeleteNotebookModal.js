import React from 'react';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { CardBody, CardActions } from '@clarityhub/unity-web/lib/components/Card';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import Button from '@clarityhub/unity-web/lib/components/Button';
import ButtonSet from '@clarityhub/unity-web/lib/components/ButtonSet';
import { useLocale } from '@clarityhub/unity-web/lib/contexts/Localization';

const DeleteNotebookModal = ({
	onClose,
	onDelete,
	notebook,
}) => {
	const [locale] = useLocale();

	return (
		<Modal open onClose={onClose}>
			<CardBody>
				<Typography type="h3">Delete Notebook?</Typography>
				<Typography type="h4">{notebook.title}, last updated {new Date(notebook.updatedAt).toLocaleDateString(locale)}</Typography>
				<Typography type="text" color="danger">This action is permanent! Are you sure you want to delete this notebook?</Typography>

				<CardActions>
					<ButtonSet spread>
						<Button onClick={onClose}>
                            No, Close
						</Button>
						<Button
							outline
							type="danger"
							onClick={onDelete(notebook.id)}
						>
                            Yes, Delete Notebook
						</Button>
					</ButtonSet>
				</CardActions>
			</CardBody>
		</Modal>
	);
};

export default DeleteNotebookModal;
