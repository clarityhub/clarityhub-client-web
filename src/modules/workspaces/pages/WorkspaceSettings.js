import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Loading from '@clarityhub/unity-web/lib/components/Loading';

import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import Page from 'modules/app/layouts/Page';

import { update, del } from '../store/actions';
import WorkspaceSettings from '../components/WorkspaceSettings';

const WorkspaceSettingsPage = ({ del, update, error, isReady, isPatching, currentWorkspaceId, workspace }) => {
	const onSubmit = useCallback(({ name }) => {
		return update(currentWorkspaceId, { name });
	}, [currentWorkspaceId, update]);

	const onDelete = useCallback(() => {
		return del(currentWorkspaceId);
	}, [currentWorkspaceId, del]);

	let content = null;

	if (error) {
		content = <Error error={error} />;
	} else if (!isReady) {
		content =
			<Loading flex size={2} />;
	} else {
		content = (
			<WorkspaceSettings
				workspace={workspace}
				onSubmit={onSubmit}
				isPatching={isPatching}
				onDelete={onDelete}
			/>
		);
	}

	return (
		<Page
			title="Workspace Settings"
			includesInnerSidenav
			crumbs={[
				{
					title: 'Home',
					path: '/',
				},
				{
					title: 'Settings',
					path: '/settings',
				},
				{
					title: 'Workspace Settings',
				},
			]}
		>
			{content}
		</Page>
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
		isPatching: state.workspaces.isPatching,
		currentWorkspaceId,
		workspace,
	};
};

const mapDispatchToProps = {
	update,
	del,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceSettingsPage);
