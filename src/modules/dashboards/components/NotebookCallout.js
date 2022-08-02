/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Icon from '@mdi/react';
import { mdiNotebookMultiple } from '@mdi/js';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import DashboardCallout from './DashboardCallout';

const NotebookCallout = () => {
	return (
		<DashboardCallout to="/notebooks/create">
			<Box flex={1} direction="row" css={css`
				align-items: center;
				justify-items: center;
			`}>
				<Box padding={{ top: 'small', bottom: 'small', left: 'small' }}>
					<Icon
						path={mdiNotebookMultiple}
						title="Create a Notebook"
						size={2}
					/>
				</Box>
				<Box flex={1} padding="small">
					<Typography type="h3" noPadding noMargin>
						Create a Notebook
					</Typography>


					<Typography>
						Organize your customer interview recordings, insights, and any
						other media you have together in one place.
					</Typography>
				</Box>
			</Box>
		</DashboardCallout>
	);
};

export default NotebookCallout;
