import React from 'react';
import { connect } from 'react-redux';

import {
	mdiChatAlertOutline,
} from '@mdi/js';

import {
	startDriftChat,
} from 'modules/chatbot/store/actions';

import styled from '@emotion/styled';
import Icon from '@mdi/react';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';

const Span = styled.span`
    height: 1.5rem;
    vertical-align: top;
    padding-right: 0.5rem;
`;

const FunctionalButton = styled.button`
	background: transparent;
	width: 100%;
    text-decoration: none;
	border: none;
	background-color: rgba(0,0,0,0);
	transition: background-color ease 0.3s;

	&:hover {
		background-color: rgba(4,15,26,0.1);
	}
	&:focus,
	&:active {
		outline: none;
		background-color: rgba(4,15,26,0.1);
	}
`;

export default connect(
	null,
	{ startDriftChat },
)(({ startDriftChat }) => {
	const openDrift = (e) => {
		e.preventDefault();
		startDriftChat();
	};

	return (
		<Box
			as={FunctionalButton}
			padding={{ top: 'xsmall', left: 'small', right: 'small', bottom: 'xsmall' }}
			direction="row"
			onClick={openDrift}
		>
			<Span>
				<Icon path={mdiChatAlertOutline}
					title={'user feedback'}
					size={1}
				/>
			</Span>
			<Typography noMargin noPadding component={Span}>
				Feedback
			</Typography>

		</Box>
	);
});
