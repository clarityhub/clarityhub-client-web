import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import CenteredMessage from 'designsystem/CenteredMessage';
import { getBilling } from 'modules/billing/store/actions';

import { getUsage } from '../store/actions';
import ViewPlanUsage from '../components/ViewPlanUsage';

const ViewPlanUsageContainer = ({ billing, isReady, getUsage, getBilling, plans, usage, error }) => {
	useEffect(() => {
		getUsage();
		getBilling();
	}, [getUsage, getBilling]);

	if (!isReady) {
		return (
			<Loading flex size={2} />
		);
	}

	if (error) {
		return (
			<Box>
				<CenteredMessage>
					<Error error={error} refresh />
				</CenteredMessage>
			</Box>
		);
	}

	return (
		<ViewPlanUsage
			plans={plans}
			usage={usage}
			billing={billing.data}
		/>
	);
};

const mapStateToProps = (state) => {

	return {
		isReady:
			state.plans.planUsage.hasLoadedAll
			&& state.plans.planUsage.isReady
			&& state.billing.status === 'ready',
		error: state.plans.planUsage.error,
		plans: state.plans.planUsage.plans,
		usage: state.plans.planUsage.usage,
		billing: state.billing,
	};
};

const mapDispatchToProps = {
	getUsage,
	getBilling,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPlanUsageContainer);
