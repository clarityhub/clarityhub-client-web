import React from 'react';

import Page from 'modules/app/layouts/Page';

import SettingsList from '../components/SettingsList';

const SettingsLandingPage = () => {
	return (
		<Page
			title="Settings"
			includesInnerSidenav
			crumbs={[
				{
					title: 'Home',
					path: '/',
				},
				{
					title: 'Settings',
				},
			]}
		>
			<SettingsList />
		</Page>
	);
};

export default SettingsLandingPage;
