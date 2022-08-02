import React from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography/Typography';

export default ({ card }) => {
	return (
		<Box flex="3" direction="row" gap="small" align="center" style={{ alignItems: 'center' }}>
			<Typography inline component="span" noMargin>
				{card.ccCardType.toUpperCase()}
			</Typography>
			<Typography inline component="span" noMargin>
				Ending in {card.ccLastFour}
			</Typography>
			<Typography inline component="span" noMargin>
				Exp: {card.ccExpiration}
			</Typography>
		</Box>
	);
};
