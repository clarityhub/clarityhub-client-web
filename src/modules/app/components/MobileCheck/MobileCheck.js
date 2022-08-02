import React from 'react';
import styled from '@emotion/styled';
import colors from '@clarityhub/unity-core/lib/colors';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Button from '@clarityhub/unity-web/lib/components/Button';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Space from '@clarityhub/unity-web/lib/scaffolding/Space';
import isMobile from 'utilities/isMobile';
import useLocalStorage from 'hooks/useLocalStorage';

const StyledWrapper = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
	z-index: 10000;

    background-color: ${colors.primary.default};
`;

const MobileCheck = ({ showIOS, showAndroid }) => {
	const [dismissed, setDimissed] = useLocalStorage('mobile-check-dismissed', false);
	const shouldShow = showIOS || isMobile.iOS() || showAndroid || isMobile.Android();

	if (dismissed || !shouldShow) {
		return null;
	}

	const buttonProps = {
		block: true,
		as: 'a',
		type: 'white',
		target: '_blank',
		rel: 'noopener noreferrer',
	};

	return (
		<StyledWrapper>
			<Box padding="large" flex={1}>
				<Box>
					<Typography type="h2" color="white" center>
                        Mobile App
					</Typography>
					<Typography color="white" center>
                        Get the best Clarity Hub experience by using our
                        mobile app.
					</Typography>
				</Box>

				<Box flex={1} style={{ justifyContent: 'center' }}>
					<Space direction="vertical">
						{
							(showIOS || isMobile.iOS()) && (
								<div>
									<Button {...buttonProps} href={process.env.REACT_APP_IOS_APP_LINK}>
                                        Download from Apple Store
									</Button>
								</div>
							)
						}
						{
							(showAndroid || isMobile.Android()) && (
								<div>
									<Button {...buttonProps} href={process.env.REACT_APP_ANDROID_APP_LINK}>
                                        Download from App Store
									</Button>
								</div>
							)
						}
					</Space>
				</Box>
				<Box>
					<Button type="white" text onClick={() => setDimissed(true)}>
                        Continue using Browser
					</Button>
				</Box>
			</Box>
		</StyledWrapper>
	);
};

export default MobileCheck;
