import React, { Fragment, useCallback, useState } from 'react';
import Img from '@clarityhub/unity-web/lib/components/Image';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import styled from '@emotion/styled';
import Button, { ButtonSet } from '@clarityhub/unity-web/lib/components/Buttons';
import { mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import userSchema from '../configs/userSchema';

const Avatar = styled(Img)`
	border-radius: 50%;
	max-width: 80px !important;
`;

const Label = styled(Typography)`
	font-size: 0.8rem;
`;

const BusinessCard = ({
	avatarUrl,
	email,
	name,
	bio,
	editable = false,
	onUpdate,
	...props
}) => {
	const [editing, setEditing] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const onSubmit = useCallback(async (data) => {
		setSubmitting(true);

		try {
			await onUpdate(data);
			setSubmitting(false);
			setSuccess(true);
			setEditing(false);
		} catch (e) {
			setSubmitting(false);
			setError(e);
		}
	}, [onUpdate]);

	const formData = {
		email,
		name,
		bio,
	};

	return (
		<Card {...props}>
			<CardBody>
				<Box direction="row" gap="medium">
					<Box>
						<Avatar
							src={avatarUrl}
						/>
					</Box>
					<Box direction="column" gap="small" flex={1}>
						{error &&
							<Error error={error} />
						}
						{success && (
							<Notification variant="thin" type="success">
								<Typography color="white">Successfully updated</Typography>
							</Notification>
						)}
						{editing ? (
							<FormFromSchema
								hideTitle
								onSubmit={onSubmit}
								schema={userSchema}
								uiSchema={{
									email: {
										'ui:disabled': true,
									},
									bio: {
										'ui:widget': 'textarea',
									},
								}}
								formData={formData}
								submitText="Save"
								submitting={submitting}

								additionalButtons={() => {
									return (
										<Button
											onClick={() => setEditing(false)}
										>
                                            Cancel
										</Button>
									);
								}}
							/>
						) : (
							<Fragment>
								<Box>
									<Label noPadding noMargin>
                                            Email
									</Label>
									<Typography noPadding noMargin>
										{email}
									</Typography>
								</Box>
								<Box>
									<Label noPadding noMargin>
                                            Name
									</Label>
									<Typography noPadding noMargin>
										{name}
									</Typography>
								</Box>
								<Box>
									<Label noPadding noMargin>
                                            Bio
									</Label>
									<Typography noPadding noMargin>
										{bio}
									</Typography>
								</Box>
							</Fragment>
						)}
					</Box>
				</Box>

				{editable && !editing && (
					<Box margin={{ top: 'medium' }}>
						<ButtonSet>
							<Button onClick={() => setEditing(true)}>
								<Icon
									path={mdiPencil}
									color="currentColor"
									title={'Edit'}
									size="1rem"
									style={{ verticalAlign: 'middle' }}
								/>
								{' '}
                                Edit
							</Button>
						</ButtonSet>
					</Box>
				)}
			</CardBody>
		</Card>
	);
};

export default BusinessCard;
