import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import FullFormLayout from '../../app/layouts/FullFormLayout';
import FullPageLoader from '../../app/layouts/FullPageLoader';
import { useAuth0 } from '../../../services/Auth0';
import LoadWorkspaces from '../containers/LoadWorkspaces';

import CreateWorkspaceLoginFlow from './loginFlow/CreateWorkspace';
import AutoPickWorkspaceLoginFlow from './loginFlow/AutoPickWorkspace';
import PickWorkspaceLoginFlow from './loginFlow/PickWorkspace';

const PickWorkspace = ({ isLoggingIn }) => {
	const { isAuthenticated, loading } = useAuth0();

	if (loading) {
		return (
			<FullFormLayout>
				<FullPageLoader loading />
			</FullFormLayout>
		);
	}

	if (!isAuthenticated) {
		// Can't pick a workspace if you aren't authenticated
		return <Redirect to="/auth" />;
	}

	return (
		<FullFormLayout>
			<LoadWorkspaces>
				{({ error, isReady, workspaces }) => {
					return (
						<FullPageLoader
							error={error}
							loading={!isReady || isLoggingIn}
							render={() => {
								if (workspaces.length === 0) {
									// Create a workspace
									return <CreateWorkspaceLoginFlow />;
								}

								if (workspaces.length === 1) {
									// Auto log into workspace
									return <AutoPickWorkspaceLoginFlow workspace={workspaces[0]} />;
								}
								// Let the user pick a workspace
								return <PickWorkspaceLoginFlow workspaces={workspaces} />;

							}}
						/>
					);
				}}
			</LoadWorkspaces>
		</FullFormLayout>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoggingIn: state.session.loggingIn,
	};
};

export default connect(mapStateToProps)(PickWorkspace);
