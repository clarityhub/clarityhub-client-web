import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';

import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

import RecentActivity from '../components/RecentActivity';
import { getAll } from '../store/actions';

const RecentActivityContainer = ({ getAll, isReady, items, error, workspace }) => {
	useEffect(() => {
		getAll();
	}, [getAll]);


	if (!isReady) {
		return (
			<Loading flex size={2} />
		);
	}

	return (
		<Fragment>
			{error && (
				<Box margin={{ bottom: 'small' }}>
					<Error error={error} />
				</Box>
			)}

			<RecentActivity
				items={items}
				workspace={workspace}
			/>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	const { currentWorkspaceId } = state.session;

	const workspace = state.workspaces.items.find(workspace => {
		return workspace.id === currentWorkspaceId;
	});

	const workspaceDone = state.workspaces.isReady && workspace;

	return {
		workspace,
		isReady: state.activities.isReady && workspaceDone,
		items: state.activities.items,
		error: state.activities.error,
	};
};

const mapDispatchToProps = {
	getAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentActivityContainer);
