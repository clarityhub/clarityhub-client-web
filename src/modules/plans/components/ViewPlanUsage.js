import React from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import ProgressBar from '@clarityhub/unity-web/lib/components/ProgressBar';
import Badge from '@clarityhub/unity-web/lib/components/Badge';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import PlanInformation from './PlanInformation';

const ViewPlanUsage = ({ billing, plans, usage }) => {
	const planCaps = plans[billing.planSlug];

	return (
		<Box margin={{ bottom: 'large' }}>
			<Typography type="h3">Usage</Typography>
			<Box>
				{(billing.planSlug === 'free' || billing.planSlug === 'expired') && (
					<Box margin={{ bottom: 'small' }}>
						<PlanInformation
							billing={billing}
							hideAction
						/>
					</Box>
				)}

				{planCaps && Object.keys(planCaps).map(k => {
					let max = planCaps[k];
					let amount = (usage[k] && usage[k].usage) || 0;
					let progress = amount * 100 / max;
					let unit = '';

					if (k === 'transcribe') {
						// Change to something more readable
						max = typeof max === 'string' ? max : max / (1000 * 60);
						progress = typeof max === 'string' ? 0 : progress;
						amount = Math.round(amount / (1000 * 60));
						unit = 'minutes';
					}

					return (
						<Box margin={{ bottom: 'small' }} key={k}>
							<Card>
								<CardBody>
									<ProgressBar primary progress={progress} type="default">
										<Badge type="default">Used {amount} of {max} {k} {unit}</Badge>
									</ProgressBar>
								</CardBody>
							</Card>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default ViewPlanUsage;
