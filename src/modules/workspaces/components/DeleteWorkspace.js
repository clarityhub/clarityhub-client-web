import React, { Fragment, useState, useCallback } from 'react';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Button, { ButtonSet } from '@clarityhub/unity-web/lib/components/Buttons';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import {
	CardBody,
	CardActions,
} from '@clarityhub/unity-web/lib/components/Card';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';


const DeleteWorkspace = ({ deleteWorkspace }) => {
	const [confirmDelete, setConfirmDelete] = useState('');
	const [showConfirm, setShowConfirm] = useState(false);

	const onShowConfirm = useCallback(() => {
		setShowConfirm(true);
	}, []);

	const onCloseConfirm = useCallback(() => {
		setShowConfirm(false);
	}, []);

	const onConfirm = useCallback(() => {
		deleteWorkspace();
	}, [deleteWorkspace]);

	const isValid = confirmDelete === 'DELETE';

	return (
		<Fragment>
			<Modal open={showConfirm} onClose={onCloseConfirm}>
				<CardBody>
					<Typography type="h3">Delete Workspace</Typography>
					<Typography type="text">Confirm that you want to delete this workspace by typing <b>DELETE</b>.</Typography>
					<Typography type="text">This action will immediately delete your workspace, notebooks, interviews, and any media you have uploaded.</Typography>

					<InputGroup>
						<LabelledInput
							type="text"
							name="confirm"
							label="Confirm by typing DELETE"
							value={confirmDelete}
							onChange={e => setConfirmDelete(e.target.value)}
						/>
					</InputGroup>

					<CardActions>
						<ButtonSet spread>
							<Button text onClick={onCloseConfirm}>
                                Cancel
							</Button>
							<Button
								type="danger"
								disabled={!isValid}
								onClick={onConfirm}
							>
                                Confirm
							</Button>
						</ButtonSet>
					</CardActions>
				</CardBody>
			</Modal>

			<Button type="danger" onClick={onShowConfirm}>
                Delete Workspace
			</Button>
		</Fragment>
	);

};

export default DeleteWorkspace;
