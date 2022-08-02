import React from 'react';
import { CardBody, CardActions } from '@clarityhub/unity-web/lib/components/Card';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import ButtonSet from '@clarityhub/unity-web/lib/components/ButtonSet';

const DeleteTagModal = ({ onClose, onDelete, open, tag }) => {
	// TODO use user locale here
	const locale = 'en-US';

	if (!tag) {
		return null;
	}

	return (
		<Modal open={open} onClose={onClose}>
			<CardBody>
				<Typography type="h3">Delete "{tag.tag}" Tag?</Typography>
				<Typography type="h4">Last updated {new Date(tag.updatedAt).toLocaleDateString(locale)}</Typography>
				<Typography type="text" color="danger">
                    This action is permanent! Are you sure you want to delete this tag?
					{!tag.parentTagId && ' All child tags under this category will be deleted as well.'}
				</Typography>

				<CardActions>
					<ButtonSet spread>
						<Button onClick={onClose}>
                            No, Close
						</Button>
						<Button
							outline
							type="danger"
							onClick={onDelete(tag.tagPath)}
						>
                            Yes, Delete Tag
						</Button>
					</ButtonSet>
				</CardActions>
			</CardBody>
		</Modal>
	);
};

export default DeleteTagModal;
