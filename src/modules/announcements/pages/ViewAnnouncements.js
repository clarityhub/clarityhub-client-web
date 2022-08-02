import React from 'react';
import Page from 'modules/app/layouts/Page';

import ViewAnnouncementsContainer from '../containers/ViewAnnouncements';

const ViewAnnouncementsPage = () => {
	return (
		<Page
			title="What's New"
			crumbs={[
				{
					title: 'Home',
					path: '/',
				},
				{
					title: 'What\'s New',
				},
			]}
		>
			<ViewAnnouncementsContainer />
		</Page>
	);
};

export default ViewAnnouncementsPage;
