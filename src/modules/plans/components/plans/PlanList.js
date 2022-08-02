import React from 'react';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import PlanItem from './PlanItem';

const cheapestFirst = (a, b) => {
	if (a.amount < b.amount) {
		return -1;
	}
	return 1;

};

const isPlan = (currentPlan, plan) => {
	return currentPlan && currentPlan.id === plan.id;
};

const hasUpgraded = (billing) => {
	return billing.billingStatus !== 'trial';
};

const notCancelled = (billing) => {
	return billing.billingStatus !== 'cancelled';
};

const notExpired = (planSlug) => {
	return planSlug !== 'expired';
};

const isActive = (billing, currentPlan, plan, planSlug) => {
	return isPlan(currentPlan, plan) && hasUpgraded(billing) && notCancelled(billing) && notExpired(planSlug);
};

const PlanList = ({ billing, plans, currentPlan, planSlug, startDriftChat }) => {
	return (
		<Box margin={{ bottom: 'large' }}>
			<Typography type="h3" noPadding>Plans</Typography>

			<Box direction="row" gap="large">
				{
					[...plans.data].sort(cheapestFirst).map((plan) => (
						<PlanItem
							key={plan.id}
							plan={plan}
							isActive={isActive(billing, currentPlan, plan, planSlug)}
							startDriftChat={startDriftChat}
						/>
					))
				}
			</Box>
		</Box>
	);
};

export default PlanList;
