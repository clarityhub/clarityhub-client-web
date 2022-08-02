import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { LinkButton } from '@clarityhub/unity-web/lib/components/Link';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import { formatCurrency } from 'utilities/currency';

const PlanItemButton = withRouter(({ isActive, plan, startDriftChat, history }) => {
	if (isActive) {
		return (
			<Button type="primary" disabled>Current</Button>
		);
	} else if (plan.metadata.action === 'contact') {
		return (
			<Button type="primary" onClick={startDriftChat}>Contact Us</Button>
		);
	}
	return (
		<LinkButton type="primary" history={history} to={`/settings/plans/upgrade?plan=${plan.id}&interval=${plan.interval}`}>
				Upgrade
		</LinkButton>
	);

});

const PlanItem = ({ plan, isActive, startDriftChat }) => {
	return (
		<Box gap="small" align="center" justify="center" flex={1}>
			<Typography type="h3" noPadding>{plan.nickname}</Typography>

			{plan.metadata && plan.metadata.showPricing && plan.metadata.showPricing === 'false' ? (
				<Typography type="text" noMargin noPadding style={{ margin: 0 }}>
					Contact us for pricing
				</Typography>
			) : (
				<Fragment>
					<Typography type="h3" noMargin noPadding style={{ margin: 0 }}>
						$<strong>
							{formatCurrency(plan.amount / 100, {
								maximumFractionDigits: 0,
								style: 'decimal',
							})}
						</strong>
					</Typography>
					<Typography noPadding noMargin>/user/{plan.interval}</Typography>

				</Fragment>

			)}

			<Box flex={1}>
				<Typography type="text">{plan.metadata.description}</Typography>
			</Box>

			<PlanItemButton plan={plan} isActive={isActive} startDriftChat={startDriftChat} />
		</Box>
	);
};

export default PlanItem;
