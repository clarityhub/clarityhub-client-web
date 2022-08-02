import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import {
	injectStripe,
} from 'react-stripe-elements';
import { getBilling, updateBilling, updateSub } from 'modules/billing/store/actions';
import queryString from 'query-string';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import CenteredMessage from 'designsystem/CenteredMessage';

import UpgradePlan from '../components/UpgradePlan';
import UpgradePlanSuccess from '../components/UpgradePlanSuccess';

const getPlanFromUrl = (location) => {
	const parsed = queryString.parse(location.search);

	return parsed;
};

const reducer = (state, action = {}) => {
	switch (action.type) {
	case 'submitting':
		return {
			...state,
			submitting: true,
		};
	case 'success':
		return {
			...state,
			error: false,
			success: true,
			submitting: false,
		};
	case 'error':
		return {
			...state,
			error: action.message,
			submitting: false,
		};
	default:
		return state;
	}
};

const UpgradePlanContainer = ({
	location,
	getBilling,
	billingStatus,
	billing,
	plansStatus,
	plans,
	stripe,
	updateBilling,
	updateSub,
}) => {
	const { plan, interval } = getPlanFromUrl(location);
	const [formData, setFormData] = useState(null);
	const [state, dispatch] = useReducer(reducer, {});
	useEffect(() => {
		if (billingStatus === 'pristine') {
			getBilling();
		}
	}, [getBilling, billingStatus]);

	const onSubmit = useCallback(async (formData) => {
		setFormData(formData);

		try {
			dispatch({
				type: 'submitting',
			});
			const cardExists = formData.paymentDetails.card.hasData;
			const billingInfo = { ...formData.orgDetails };

			if (!cardExists) {
				let { token } = await stripe.createToken({ name: 'Name' });

				if (!token) {
					dispatch({
						type: 'error',
						message: 'You need to add your payment details',
					});
					return;
				}

				billingInfo.token = token.id;
			}

			await updateBilling(billingInfo, { noLoading: true });

			const planDetails = formData.planDetails;
			const plan = {
				planId: planDetails.plan.id,
				couponCode: planDetails.coupon,
			};

			await updateSub(plan);

			dispatch({
				type: 'success',
			});
		} catch (e) {
			dispatch({
				type: 'error',
				message: e.message,
			});
		}
	}, [stripe, updateBilling, updateSub]);

	if (plansStatus === 'pristine' || billingStatus === 'pristine' ||
		plansStatus === 'loading' || billingStatus === 'loading') {
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

	if (state.success) {
		return <UpgradePlanSuccess />;
	}

	return (
		<UpgradePlan
			error={state.error}
			onSubmit={onSubmit}
			billing={billing}
			plans={plans}
			submitting={state.submitting}
			formData={formData}
			defaultPlan={plans.data.find(p => p.id === plan && p.interval === interval)}
		/>
	);
};

const mapStateToProps = (state) => ({
	billingStatus: state.billing.status,
	billing: state.billing,
	plansStatus: state.plans.items.status,
	plans: state.plans.items,
});

const mapDispatchToProps = {
	getBilling,
	updateBilling,
	updateSub,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(UpgradePlanContainer));
