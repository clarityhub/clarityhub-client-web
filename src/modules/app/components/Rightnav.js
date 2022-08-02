import React from 'react';
import styled from '@emotion/styled';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Icon from '@mdi/react';
import { mdiArrowCollapseRight } from '@mdi/js';
import Button from '@clarityhub/unity-web/lib/components/Buttons';

import MediaView from 'modules/medias/containers/MediaView';
import { RIGHT_SIDENAV_WIDTH } from '../config';

const RightnavWrapper = styled.div`
    background: #eef0f4;
    /* box-shadow: 0 2px 4px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(50,50,93,0.11); */
    width: ${RIGHT_SIDENAV_WIDTH};
	position: relative;
	overflow: auto;
    height: 100%;
	z-index: 1002;
`;

const StyledButton = styled(Button)`
	position: absolute;
	left: -25px;
	padding: 0.3rem;
	border-radius: 50%;
	margin: 1rem 0.5rem 0.5rem;
	line-height: 0rem;
	cursor: pointer;
	z-index: 2000;
`;

const CloseRightPaneButton = ({ onClose }) => (
	<StyledButton onClick={onClose}>
		<Icon
			path={mdiArrowCollapseRight}
			color="currentColor"
			title="close"
			size={0.8}
		/>
	</StyledButton>
);

const renderView = ({ view }) => {
	switch (view.type) {
	case 'media':
		return (
			<MediaView key={view.id} mediaId={view.id} isInSidenav />
		);
	default:
		return (
			<Notification variant="thin" type="danger">
                Unknown media type
			</Notification>
		);
	}
};

const Rightnav = ({ isOpen, view, when, onClose }) => {
	if (isOpen) {
		return (
			<div style={{ position: 'relative' }}>
				<CloseRightPaneButton
					onClose={onClose}
				/>
				<RightnavWrapper>
					<Box padding="small">
						{renderView({ view })}
					</Box>
				</RightnavWrapper>
			</div>
		);
	}

	return null;
};

export default Rightnav;
