/** @jsx jsx */
import { jsx } from '@emotion/core';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

const VideoEmpty = ({ showMessage }) => {
	return (
		<Box flex={1} css={{ color: 'white', height: 'calc(100% - 60px)', textAlign: 'center', justifyContent: 'center' }}>
			{showMessage && <Typography noMargin noPadding color="white">No one here</Typography>}
		</Box>
	);
};

export default VideoEmpty;
