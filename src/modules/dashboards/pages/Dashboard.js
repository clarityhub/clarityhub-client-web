import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Card, {
	CardBody,
} from '@clarityhub/unity-web/lib/components/Card';
import Content from 'modules/app/components/Content';

import RecentActivity from '../containers/RecentActivity';

import InterviewCallout from '../components/InterviewCallout';
import NotebookCallout from '../components/NotebookCallout';

const Dashboard = ({ error, isReady, workspace }) => {
	if (error) {
		return <div>Error</div>;
	}

	if (!isReady) {
		return <div>Loading</div>;
	}

	return (
		<Content>
			<Typography type="h2" noMargin noPadding>
				{workspace.name}
			</Typography>

			<Box margin={{ top: 'medium' }}>
				<Card flat type="callout">
					<CardBody>
						<Typography type="h3" center noPadding>
							Get Started
						</Typography>

						<Box margin="small" gap="small" direction="column">
							<Box>
								<InterviewCallout />
							</Box>
							<Box>
								<NotebookCallout />
							</Box>
						</Box>
					</CardBody>
				</Card>
			</Box>

			<Box margin={{ top: 'medium' }}>
				<Card>
					<CardBody>
						<Box margin="small" direction="column">
							<Box margin={{ bottom: 'small' }}>
								<Typography type="h3" center noPadding>
									Recent Activity
								</Typography>
							</Box>

							<RecentActivity />
						</Box>
					</CardBody>
				</Card>
			</Box>
		</Content>
	);
};

const mapStateToProps = (state) => {
	const { currentWorkspaceId } = state.session;

	const workspace = state.workspaces.items.find(workspace => {
		return workspace.id === currentWorkspaceId;
	});

	return {
		error: state.workspaces.error,
		isReady: state.workspaces.isReady && workspace,
		currentWorkspaceId,
		workspace,
	};
};


const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
