import React from 'react';
import Page from 'modules/app/layouts/Page';

import WorkspacesList from '../containers/WorkspacesList';

const MyWorkspacesPage = () => {
	return (
		<Page
			title="My Workspaces"
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
					title: 'My Workspaces',
				},
			]}
		>
			<WorkspacesList />
		</Page>
	);
};

export default MyWorkspacesPage;
