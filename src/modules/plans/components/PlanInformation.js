import React from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Card from '@clarityhub/unity-web/lib/components/Card/Card';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { LinkButton } from '@clarityhub/unity-web/lib/components/Link';
import { differenceInDays } from 'utilities/datetime';
import { formatCurrency } from 'utilities/currency';

const PlanInformation = ({ billing, history, hideAction = false }) => {
	const { upcomingInvoice } = billing;
	let timeLeft = billing.trialDate;
	const now = new Date().valueOf();
	const isTrial = billing.billingStatus === 'trial';
	const isTrialExpired = billing.trialDate * 1000 < now;

	if (timeLeft) {
		timeLeft = differenceInDays(now, timeLeft * 1000);
	}

	if (upcomingInvoice.error) {
		return (
			<Card margin={{ bottom: 'medium' }}>
				<Box
					padding="small"
				>
					<Box
						direction="row"
						gap="small"
						padding={{ top: 'xsmall' }}
					>
						<Box flex={2}>
							<Typography type="text">
								Your subscription has been cancelled.
							</Typography>
						</Box>
						{!hideAction && (
							<Box flex={1}>
								<LinkButton outline type="primary" history={history} to="/settings/plans">
									Change Plan
								</LinkButton>
							</Box>
						)}
					</Box>
				</Box>
			</Card>
		);
	}

	if (isTrial && isTrialExpired) {
		return (
			<Card margin={{ bottom: 'medium' }}>
				<Box
					padding="small"
				>
					<Box
						direction="row"
						gap="small"
						padding={{ top: 'xsmall' }}
					>
						<Box flex={2}>
							<Typography type="text">
								Your <strong>Free Trial</strong> has ended. Upgrade your
								plan to continue using your workspace.
							</Typography>
						</Box>
						{!hideAction && (
							<Box flex={1}>
								<LinkButton outline type="primary" history={history} to="/settings/plans">
									Change Plan
								</LinkButton>
							</Box>
						)}
					</Box>
				</Box>
			</Card>
		);
	}

	const nextBillingDate = new Date(upcomingInvoice.next_payment_attempt * 1000);

	return (
		<Card margin={{ bottom: 'medium' }}>
			<Box
				padding="small"
			>
				{!isTrial && <Typography type="h3" noPadding >{billing.planName}</Typography>}
				<Box
					direction="row"
					gap="small"
					padding={{ top: 'xsmall' }}
				>
					<Box flex={2}>
						{isTrial ? (
							<Typography type="text">
								You have <strong>{timeLeft} days</strong> left on your <strong>Free Trial</strong>
							</Typography>
						) : (
							<Typography type="text">
								Your next bill is on {
									nextBillingDate.toLocaleDateString(undefined, {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})
								} for {
									formatCurrency(
										Number(upcomingInvoice.total/100),
										{ currency: upcomingInvoice.currency.toUpperCase() },
									)
								}.
							</Typography>
						)
						}
					</Box>
					{!hideAction && (
						<Box flex={1}>
							<LinkButton outline type="primary" history={history} to="/settings/plans">
								Change Plan
							</LinkButton>
						</Box>
					)}
				</Box>
			</Box>
		</Card>
	);
};

export default withRouter(PlanInformation);
