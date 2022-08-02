import React, { useState, useCallback } from 'react';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import colors from '@clarityhub/unity-core/lib/colors';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import CenteredMessage from 'designsystem/CenteredMessage';

import joinRoomSchema, { uiSchema as joinRoomUiSchema } from '../schemas/JoinRoom';

const Lobby = ({ videoCall, identity, onJoin }) => {
	const [error, setError] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		password: identity.password || '',
	});

	const handleChange = useCallback((data) => {
		setFormData(data.formData);
	}, []);

	const handleSubmit = useCallback(async (values) => {
		setSubmitting(true);

		try {
			await onJoin(values);
		} catch (e) {
			setError(e);
		} finally {
			setSubmitting(false);
		}
	}, [onJoin]);

	// TODO loading
	// TODO error

	return (
		<Box style={{ backgroundColor: colors.muted.default }} flex={1}>
			<CenteredMessage suggestedWidth="400px">
				<Card>
					<CardBody>
						{videoCall && videoCall.publicName && (
							<Typography type="h2" center noMargin noPadding>
								{videoCall.publicName}
							</Typography>
						)}
						{error &&
                            <Error error={error} />
						}
						<FormFromSchema
							hideTitle
							submitting={submitting}
							formData={formData}
							onChange={handleChange}
							onSubmit={handleSubmit}
							schema={joinRoomSchema}
							uiSchema={joinRoomUiSchema}
							submitText="Join"
						/>
					</CardBody>
				</Card>
			</CenteredMessage>
		</Box>
	);
};

export default Lobby;
