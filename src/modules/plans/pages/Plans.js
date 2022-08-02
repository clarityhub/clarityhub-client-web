import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import Content from 'modules/app/components/Content';
import AppBreadcrumbs from 'modules/app/containers/AppBreadcrumbs';
import { Flag } from 'modules/app/components/Flags';

import PlanActions from '../components/PlanActions';
import ViewPlanUsage from '../containers/ViewPlanUsage';
import PlansList from '../containers/PlansList';
import CancelPlan from '../containers/CancelPlan';

const Plans = () => {
	return (
		<Fragment>
			<Helmet>
				<title>Workspace Plan – Clarity Hub</title>
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
					},
				]}
			/>

			<Content>
				<Typography type="h2" noMargin noPadding>
                    Workspace Plan
				</Typography>

				<Box flex={1}>
					<ViewPlanUsage />

					<Flag
						name={['features', 'billing']}
						render={() => <PlansList />
						}
					/>

					<Flag
						name={['features', 'billing']}
						render={() => (
							<Fragment>
								<PlanActions>
									<CancelPlan />
								</PlanActions>
							</Fragment>
						)}
					/>
				</Box>
			</Content>
		</Fragment>
	);
};


export default Plans;
