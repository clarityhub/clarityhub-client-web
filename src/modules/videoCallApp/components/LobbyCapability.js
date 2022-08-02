import React from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import colors from '@clarityhub/unity-core/lib/colors';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import CenteredMessage from 'designsystem/CenteredMessage';

const LobbyCapability = () => {
	return (
		<Box style={{ backgroundColor: colors.muted.default }} flex={1}>
			<CenteredMessage suggestedWidth="400px">
				<Card>
					<CardBody>
						<Typography center type="h2" noMargin noPadding>
							Unsupported Browser
						</Typography>


						<Typography center type="h4">
                            The browser you are using does not provide the capabilities to
                            do a video call.
						</Typography>

						<Typography center>
                            Please use
							{' '}
							<a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank" rel="noopener noreferrer">Firefox</a>
							{' '}
                             or
							{' '}
							<a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">Google Chrome</a>.
						</Typography>
					</CardBody>
				</Card>
			</CenteredMessage>
		</Box>
	);
};

export default LobbyCapability;
