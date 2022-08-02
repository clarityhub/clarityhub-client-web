/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

const VideoTitle = ({ children }) => {
	return (
		<Typography
			noPadding
			noMargin
			color="white"
			css={css`
                position: absolute;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.6);
                padding: 0 4px;
                z-index: 10000;
            `}
		>
			{children}
		</Typography>
	);
};

export default VideoTitle;
