import React from 'react';
import { Route } from 'react-router-dom';
import styled from '@emotion/styled';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Layout from '@clarityhub/unity-web/lib/scaffolding/Layout';

import DriftChatBot from 'modules/chatbot/containers/DriftChatBot';
import Pusher from 'modules/sockets/containers/Pusher';

import FloatingRecordingPanel from 'modules/recordings/containers/FloatingRecordingPanel';
import InnerSidenav from 'modules/workspaces/components/InnerSidenav';

import Bootstrap from '../containers/Bootstrap';
import Sidenav from '../containers/Sidenav';
import Rightnav from '../containers/Rightnav';
import { Flag } from '../components/Flags';

import {
	BREADCRUMB_HEIGHT,
	MAX_CONTENT_WIDTH,
} from '../config';

const ContentWrapper = styled.div`
	max-width: ${MAX_CONTENT_WIDTH};
	max-height: 100%;
	height: 100%;
	overflow: auto;
	padding-top: ${BREADCRUMB_HEIGHT};
	width: 100%;

`;

const AppLayout = ({ children }) => {
	return (
		<Pusher>
			<Layout style={{ background: 'white' }}>
				<Bootstrap>

					<Box direction="row" style={{ height: '100%' }}>
						<Sidenav />
						<Route path="/settings" render={() => <InnerSidenav />} />

						<Box flex={1}>
							<ContentWrapper>
								{children}
							</ContentWrapper>
						</Box>
						<Rightnav />

						<FloatingRecordingPanel />
					</Box>
					<Flag
						name={['features', 'drift']}
						render={() => <DriftChatBot />
						}
					/>
				</Bootstrap>
			</Layout>
		</Pusher>
	);
};

export default AppLayout;
