import React, { Fragment } from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import colors from '@clarityhub/unity-core/lib/colors';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import CenteredMessage from 'designsystem/CenteredMessage';

const PostCallPage = ({ videoCall, type }) => {
	return (
		<Box style={{ backgroundColor: colors.muted.default }} flex={1}>
			<CenteredMessage suggestedWidth="400px">
				<Card>
					<CardBody>
						<Typography center type="h2" noMargin noPadding>
							{videoCall.publicName}
						</Typography>

						{type === 'COMPLETE' && (
							<Fragment>
								<Typography center type="h4">
									This call has ended.
								</Typography>

								<Typography center>
									Thank you for using Clarity Hub Video Chat!
								</Typography>
							</Fragment>
						)}
						{type === 'LEAVE' && (
							<Fragment>
								<Typography center type="h4">
									You have left the call.
								</Typography>

								<Typography center>
									Thank you for using Clarity Hub Video Chat!
								</Typography>
							</Fragment>
						)}
					</CardBody>
				</Card>
			</CenteredMessage>
		</Box>
	);
};

export default PostCallPage;
