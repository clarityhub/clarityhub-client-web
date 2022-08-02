import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import breakpoints from '@clarityhub/unity-web/lib/theme/breakpoints';

import Plans from 'modules/plans/pages/Plans';
import UpgradePlan from 'modules/plans/pages/UpgradePlan';
import Payment from 'modules/billing/pages/Payment';
import SettingsMe from 'modules/members/pages/SettingsMe';
import ListIntegrations from 'modules/integrations/pages/Integrations';
import IntegrationSetupPage from 'modules/integrations/pages/IntegrationSetup';
import IntegrationEdit from 'modules/integrations/pages/IntegrationEdit';

import SettingsLanding from './SettingsLanding';
import Members from './Members';
import MyWorkspaces from './MyWorkspaces';
import WorkspaceSettings from './WorkspaceSettings';

const SettingsPage = () => {
	// If mobile, allow a settings page
	const mobile = window.matchMedia(`(max-width: ${breakpoints.tablet})`);

	return (
		<Fragment>
			<Box direction="row" flex={1} style={{ height: '100%' }}>
				{/*
				NOTE: The account sidenav (InnerSidenav) is included in AppLayout
				*/}

				<Switch>
					{
						mobile.matches &&
							<Route path="/settings" exact component={SettingsLanding} />

					}
					<Route path="/settings/me" exact component={SettingsMe} />
					<Route path="/settings/my-workspaces" exact component={MyWorkspaces} />
					<Route path="/settings/workspace" exact component={WorkspaceSettings} />
					<Route path="/settings/members" exact component={Members} />
					<Route path="/settings/plans" exact component={Plans} />
					<Route path="/settings/payment" exact component={Payment} />
					<Route path="/settings/plans/upgrade" exact component={UpgradePlan} />
					{/* <Route path="/settings/workspaces" exact component={MyWorkspaces} />
					<Route path="/settings/billing" exact component={AccountLanding} /> */}

					<Route path="/settings/integrations" exact component={ListIntegrations} />
					<Route path="/settings/integrations/:appName" exact component={IntegrationSetupPage} />
					<Route path="/settings/integrations/edit/:integrationKey" exact component={IntegrationEdit} />

					<Route render={() => <Redirect to="/settings/workspace" />} />
				</Switch>
			</Box>
		</Fragment>
	);
};

export default SettingsPage;
