import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import CenteredMessage from 'designsystem/CenteredMessage';

import { startDriftChat } from 'modules/chatbot/store/actions';
import { getBilling } from 'modules/billing/store/actions';
import PlanList from '../components/plans/PlanList';

const PlansList = ({
	billing,
	plansStatus,
	billingStatus,
	plans,
	getBilling,
	currentPlan,
	planSlug,
	startDriftChat,
}) => {
	useEffect(() => {
		if (plansStatus === 'pristine') {
			getBilling();
		}
	}, [getBilling, plansStatus]);

	if (plansStatus === 'loading' || billingStatus === 'loading') {
		return (
			<Loading flex size={2} />
		);
	}
	if (plansStatus === 'failed' || billingStatus === 'failed') {
		return (
			<Box>
				<CenteredMessage>
					<Error refresh />
				</CenteredMessage>
			</Box>
		);
	}

	return (
		<PlanList
			billing={billing}
			plans={plans}
			currentPlan={currentPlan}
			planSlug={planSlug}
			startDriftChat={startDriftChat}
		/>
	);
};

const mapStateToProps = (state) => ({
	plansStatus: state.plans.items.status,
	billingStatus: state.billing.status,
	plans: state.plans.items,
	currentPlan: state.billing && state.billing.data && state.billing.data.planObject,
	planSlug: state.billing && state.billing.data && state.billing.data.planSlug,
	billing: state.billing && state.billing.data,
});

const mapDispatchToProps = {
	getBilling,
	startDriftChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlansList);
