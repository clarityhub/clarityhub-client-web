import React from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

const SidenavSection = ({ children }) => (
	<Box margin="small">
		<Typography type="h3" noMargin noPadding style={{ fontSize: '1.2rem' }}>
			{children}
		</Typography>
	</Box>
);

export default SidenavSection;
