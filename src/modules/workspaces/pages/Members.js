import React from 'react';

import Page from 'modules/app/layouts/Page';
import MembersList from 'modules/members/containers/MembersList';

const MembersPage = () => {
	return (
		<Page
			title="Members"
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
					title: 'Members',
				},
			]}
		>
			<MembersList />
		</Page>
	);
};

export default MembersPage;
