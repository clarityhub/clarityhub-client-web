import React from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import {
	mdiNotebookMultiple,
	mdiTextBoxCheck,
	mdiAccountVoice,
	mdiStarOutline,
	mdiTagMultiple,
	mdiHome,
} from '@mdi/js';

import SidenavItem from 'designsystem/SidenavItem';
import { Flag } from './Flags';

const SidenavSectionNavItems = ({ closeLeftPane }) => (
	<Box>
		<SidenavItem
			onBeforeNavigate={closeLeftPane}
			icon={mdiHome}
			title="Dashboard"
			to="/"
		/>
		<SidenavItem
			onBeforeNavigate={closeLeftPane}
			icon={mdiNotebookMultiple}
			title="Notebooks"
			to="/notebooks"
		/>
		<SidenavItem
			onBeforeNavigate={closeLeftPane}
			icon={mdiAccountVoice}
			title="Interviews"
			to="/interviews"
		/>
		<Flag
			name={['features', 'surveys']}
			render={() => (
				<SidenavItem
					onBeforeNavigate={closeLeftPane}
					icon={mdiTextBoxCheck}
					title="Surveys"
					to="/surveys"
				/>
			)}
		/>
		<Flag
			name={['features', 'highlights']}
			render={() => (
				<SidenavItem
					onBeforeNavigate={closeLeftPane}
					icon={mdiStarOutline}
					title="Highlights"
					to="/highlights"
				/>
			)}
		/>
		<Flag
			name={['features', 'tagManagement']}
			render={() => (
				<SidenavItem
					onBeforeNavigate={closeLeftPane}
					icon={mdiTagMultiple}
					title="Tags"
					to="/tags"
				/>
			)}
		/>
	</Box>
);

export default SidenavSectionNavItems;
