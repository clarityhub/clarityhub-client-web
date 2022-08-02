/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Icon from '@mdi/react';
import { mdiAccountVoice } from '@mdi/js';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import DashboardCallout from './DashboardCallout';

const InterviewCallout = () => {
	return (
		<DashboardCallout to="/interviews/create">
			<Box flex={1} direction="row" css={css`
				align-items: center;
				justify-items: center;
			`}>
				<Box padding={{ top: 'small', bottom: 'small', left: 'small' }}>
					<Icon
						path={mdiAccountVoice}
						title="Start an Interview"
						size={2}
					/>
				</Box>
				<Box flex={1} padding="small">
					<Typography type="h3" noPadding noMargin>
						Start a New Interview
					</Typography>


					<Typography>
						Start a voice recording or do a video call with your customers and
						record any insights.
					</Typography>
				</Box>
			</Box>
		</DashboardCallout>
	);
};

export default InterviewCallout;
