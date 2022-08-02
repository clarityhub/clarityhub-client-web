/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

const VideoLabel = ({ children }) => {
	return (
		<Typography
			noPadding
			noMargin
			color="white"
			css={css`
                position: absolute;
                bottom: 4px;
                left: 0;
                background: rgba(0, 0, 0, 0.6);
                padding: 0 4px;
            `}
		>
			{children}
		</Typography>
	);
};

export default VideoLabel;
