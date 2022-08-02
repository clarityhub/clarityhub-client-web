import React from 'react';

import Page from 'modules/app/layouts/Page';

import SettingsMe from '../containers/SettingsMe';

const SettingsPage = () => {
	return (
		<Page
			title="My Profile"
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
					title: 'My Profile',
				},
			]}
		>
			<SettingsMe />
		</Page>
	);
};

export default SettingsPage;
