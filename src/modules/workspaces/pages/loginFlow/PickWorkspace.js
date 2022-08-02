import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import styled from '@emotion/styled';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import PickWorkspaceList from '../../components/PickWorkspaceList';
import PickWorkspaceContainer from '../../containers/PickWorkspace';

const CardWrapper = styled.div`
	width: 500px;
	max-width: 100%;
`;

const PickWorkspaceLoginFlow = ({ workspaces }) => {
	return (
		<PickWorkspaceContainer>
			{({ onPick, error }) => {
				return (
					<Fragment>
						<Box margin={{ bottom: 'large' }}>
							<Typography center type="h2" noMargin noPadding>
                                Pick Workspace
							</Typography>
						</Box>
						<CardWrapper>
							<Card>
								<CardBody>
									<PickWorkspaceList workspaces={workspaces} onPick={onPick} />
								</CardBody>
							</Card>
						</CardWrapper>

						<Box margin={{ top: 'large' }}>
							<Typography center noMargin noPadding>
								<Link to="/auth/logout">Logout</Link>
							</Typography>
						</Box>
					</Fragment>
				);
			}}
		</PickWorkspaceContainer>
	);
};

export default PickWorkspaceLoginFlow;
