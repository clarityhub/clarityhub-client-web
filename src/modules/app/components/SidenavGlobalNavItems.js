import React from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import {
	mdiMagnify,
	mdiBellOutline,
	mdiCogOutline as mdiSettingsOutline,
} from '@mdi/js';

import SidenavItem from 'designsystem/SidenavItem';
import { Flag } from './Flags';

const SidenavGlobalNavItems = ({ closeLeftPane }) => (
	<Box>
		<Flag
			name={['features', 'globalSearch']}
			render={() => (
				<SidenavItem
					onBeforeNavigate={closeLeftPane}
					icon={mdiMagnify}
					title="Quick Find"
					to="/search"
				/>
			)}
		/>
		<SidenavItem
			onBeforeNavigate={closeLeftPane}
			icon={mdiBellOutline}
			title="What's New"
			to="/announcements"
		/>
		<SidenavItem
			onBeforeNavigate={closeLeftPane}
			icon={mdiSettingsOutline}
			title="Settings and Members"
			to="/settings"
		/>
	</Box>
);

export default SidenavGlobalNavItems;
