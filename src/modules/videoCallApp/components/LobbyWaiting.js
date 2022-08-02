import React, { useEffect } from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import colors from '@clarityhub/unity-core/lib/colors';
import CenteredMessage from 'designsystem/CenteredMessage';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { Link } from 'react-router-dom';

const LobbyWaiting = ({ videoCall, onRetry }) => {
	let content = null;

	useEffect(() => {
		if (videoCall.status === 'NOT_STARTED') {
			setTimeout(() => {
				onRetry();
			}, 10000);
		}
	}, [onRetry, videoCall]);

	switch (videoCall.status) {
	case 'COMPLETE':
		content = (
			<Card>
				<CardBody>
					<Typography center type="h2" noMargin noPadding>
						{videoCall.publicName}
					</Typography>

					<Typography center type="h4">
						This video call has already ended
					</Typography>

				</CardBody>
			</Card>
		);
		break;
	case 'NOT_STARTED':
	default:
		content = (
			<Card>
				<CardBody>
					<Typography center type="h2" noMargin noPadding>
						{videoCall.publicName}
					</Typography>

					<Typography center type="h4">
						Waiting for host to start this session
					</Typography>

					<Box margin="medium">
						<Loading flex />
					</Box>

					<Typography center>
                            If you the host, <Link to="/">login</Link> to start this session
					</Typography>

				</CardBody>
			</Card>
		);
	}

	return (
		<Box style={{ backgroundColor: colors.muted.default }} flex={1}>
			<CenteredMessage suggestedWidth="400px">
				{content}
			</CenteredMessage>
		</Box>
	);
};

export default LobbyWaiting;
