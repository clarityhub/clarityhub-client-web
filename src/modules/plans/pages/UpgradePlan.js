import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Elements } from 'react-stripe-elements';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import Content from 'modules/app/components/Content';
import AppBreadcrumbs from 'modules/app/containers/AppBreadcrumbs';

import UpgradePlanContainer from '../containers/UpgradePlan';

const UpgradePlan = ({ location }) => {
	return (
		<Elements>
			<Fragment>
				<Helmet>
					<title>Workspace Upgrade Plan – Clarity Hub</title>
				</Helmet>
				<AppBreadcrumbs
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
							title: 'Workspace Plan',
							path: '/settings/plans',
						},
						{
							title: 'Upgrade',
						},
					]}
				/>

				<Content>
					<Typography type="h2" noMargin noPadding>
						Upgrade Plan
					</Typography>

					<Box flex={1}>
						<UpgradePlanContainer location={location} />
					</Box>
				</Content>
			</Fragment>
		</Elements>
	);
};


export default UpgradePlan;
