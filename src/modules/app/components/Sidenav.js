import React from 'react';
import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import SideNav from '@clarityhub/unity-web/lib/components/SideNav2';

import SidenavSeparator from 'designsystem/SidenavSeparator';
import { LEFT_SIDENAV_WIDTH } from '../config';
import SidenavWorkspaceHeader from './SidenavWorkspaceHeader';
import SidenavGlobalNavItems from './SidenavGlobalNavItems';
import SidenavSectionNavItems from './SidenavSectionNavItems';
import UserFeedback from './UserFeedback';

const Sidenav = ({
	error,
	isReady,
	workspace,
	switchWorkspace,
	logout,

	isOpen,
	openLeftPane,
	closeLeftPane,
}) => {
	return (
		<SideNav
			onOpen={openLeftPane}
			onClose={closeLeftPane}
			isOpen={isOpen}
			width={LEFT_SIDENAV_WIDTH}
			mobileOpenComp={(
				<Icon path={mdiMenu}
					title="Open Menu"
					color="currentColor"
					size={1.2}
				/>
			)}
		>
			<SidenavWorkspaceHeader
				error={error}
				isReady={isReady}
				logout={logout}
				switchWorkspace={switchWorkspace}
				workspace={workspace}
			/>

			<SidenavGlobalNavItems closeLeftPane={closeLeftPane} />

			<SidenavSeparator />

			<SidenavSectionNavItems closeLeftPane={closeLeftPane} />

			<SidenavSeparator />

			<UserFeedback />
		</SideNav>
	);
};

export default Sidenav;
