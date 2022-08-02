import React from 'react';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';

const PlanList = ({ children }) => {
	return (
		<Box margin={{ bottom: 'large' }}>
			<Typography type="h3" noPadding>Danger Zone</Typography>

			<Box direction="row" gap="large">
				{children}
			</Box>
		</Box>
	);
};

export default PlanList;
