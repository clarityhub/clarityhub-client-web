import React, { useState, useCallback } from 'react';
import { bool, func } from 'prop-types';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Button, { ButtonSet } from '@clarityhub/unity-web/lib/components/Buttons';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import {
	CardBody,
	CardActions,
} from '@clarityhub/unity-web/lib/components/Card';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';

const InviteModal = ({ open, onClose, onSubmit }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = useCallback(async () => {
		setLoading(true);

		try {
			await onSubmit(email);
			setLoading(false);
			setError(null);
		} catch (e) {
			setError(e);
			setLoading(false);
		}
	}, [email, onSubmit]);

	return (
		<Modal open={open} onClose={onClose}>
			<CardBody>
				<Typography type="h3">Invite Member</Typography>
				<Typography type="text">Add someone to your workspace by typing their email. We'll send them an invitation via the email you provide.</Typography>
				<Typography type="text">Adding members will update your subscription.</Typography>

				{error &&
					<Error error={error} />
				}

				<InputGroup>
					<LabelledInput
						type="email"
						name="invite"
						label="Email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</InputGroup>

				<CardActions>
					<ButtonSet spread>
						<Button text onClick={onClose}>
                            Cancel
						</Button>
						<Button
							type="primary"
							onClick={handleSubmit}
							disabled={loading}
							loading={loading}
						>
                            Invite
						</Button>
					</ButtonSet>
				</CardActions>
			</CardBody>
		</Modal>
	);
};

InviteModal.propTypes = {
	onClose: func,
	onSubmit: func,
	open: bool,
};

export default InviteModal;
