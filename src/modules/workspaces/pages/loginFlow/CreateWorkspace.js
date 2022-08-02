import React, { Fragment } from 'react';
import styled from '@emotion/styled';

import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import WorkspaceForm from '../../components/WorkspaceForm';
import CreateWorkspaceContainer from '../../containers/CreateWorkspace';

const CardWrapper = styled.div`
	width: 500px;
	max-width: 100%;
`;

const CreateWorkspaceLoginFlow = () => {
	return (
		<CreateWorkspaceContainer>
			{(props) => {
				return (
					<Fragment>
						<Box margin={{ bottom: 'large' }}>
							<Typography center type="h2" noMargin noPadding>
                                Welcome to Clarity Hub!
							</Typography>
						</Box>
						<CardWrapper>
							<Card>
								<CardBody>
									<Typography center type="h3" noMargin noPadding>
                                        Let's create your first workspace
									</Typography>
									<Typography center>
                                        Your workspace is where you can record interviews and collaborate with your team.
									</Typography>
									<WorkspaceForm
										{...props}
										submitText="Create Workspace"
									/>
								</CardBody>
							</Card>
						</CardWrapper>
					</Fragment>
				);
			}}
		</CreateWorkspaceContainer>
	);
};

export default CreateWorkspaceLoginFlow;
