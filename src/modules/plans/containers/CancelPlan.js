import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import CenteredMessage from 'designsystem/CenteredMessage';

import { refresh } from 'modules/auth/store/actions';
import { getBilling, cancelSub } from 'modules/billing/store/actions';
import CancelPlan from '../components/CancelPlan';

const CancelPlanContainer = ({
	cancelSub,
	billingStatus,
	billing,
	refresh,
	getBilling,
}) => {
	useEffect(() => {
		if (billingStatus === 'pristine') {
			getBilling();
		}
	}, [billingStatus, getBilling]);

	if (billingStatus === 'loading' || billingStatus === 'pristine') {
		return (
			<Loading flex size={2} />
		);
	}
	if (billingStatus === 'error') {
		return (
			<Box>
				<CenteredMessage>
					<Error refresh />
				</CenteredMessage>
			</Box>
		);
	}

	return (
		<CancelPlan
			cancelSub={cancelSub}
			getBilling={getBilling}
			refresh={refresh}
			billing={billing}
		/>
	);
};

const mapStateToProps = (state) => ({
	billingStatus: state.billing.status,
	billing: state.billing && state.billing.data,
});

const mapDispatchToProps = {
	getBilling,
	cancelSub,
	refresh,
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelPlanContainer);
