import React, { Fragment, useState } from 'react';
import { Elements } from 'react-stripe-elements';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Button from '@clarityhub/unity-web/lib/components/Button';

import Content from 'modules/app/components/Content';
import PlanInformation from 'modules/plans/components/PlanInformation';

import UpdateCardInformation from '../components/UpdateCardInformation';
import UpdateBillingAddress from '../components/UpdateBillingAddress';
import BillingAddress from '../components/BillingAddress';
import CardDetails from '../components/CardDetails';
import ViewInvoicesContainer from './ViewInvoices';

const PaymentContainer = ({ billing }) => {
	const [showPaymentForm, setShowPayment] = useState(billing.data && billing.data.card && billing.data.card.hasData);
	const [showAddressForm, setShowAddressForm] = useState(billing.data && billing.data.address && billing.data.address.hasData);

	return (
		<Content>
			<PlanInformation billing={billing.data} />

			<Box flex={1} margin={{ top: 'medium', bottom: 'medium' }}>
				<Typography type="h3" noMargin gutterBottom>
					Card Details
				</Typography>
				{billing.data.billingStatus === 'active' ? (
					<Fragment>
						{
							showPaymentForm ? (
								<Box direction="row" margin={{ top: 'medium' }} align="center">
									<CardDetails card={billing.data.card} />
									<Button outline type="primary" onClick={() => setShowPayment(!showPaymentForm)}>Update Card</Button>
								</Box>
							) : (
								<Fragment>
									<Elements>
										<UpdateCardInformation
											billing={billing}
											onCancel={() => setShowPayment(!showPaymentForm)}
											canCancel={billing.data && billing.data.card && billing.data.card.hasData}
										/>
									</Elements>
								</Fragment>
							)
						}
					</Fragment>
				) : (
					<Fragment>
						<Typography>Your card details will appear here after you upgrade to a plan.</Typography>
					</Fragment>
				)}
			</Box>
			<Box>
				<Typography type="h3" noMargin gutterBottom>
					Organization Details
				</Typography>
				{
					showAddressForm ? (
						<Box margin={{ bottom: 'medium' }}>
							<BillingAddress address={{
								billingEmail: billing.data.billingEmail,
								...billing.data.address,
							}} />
							<Box margin={{ top: 'small' }} direction="row">
								<Button outline type="primary" onClick={() => setShowAddressForm(!showAddressForm)}>Update Details</Button>
							</Box>
						</Box>
					) : (
						<Box margin={{ bottom: 'medium' }}>
							<UpdateBillingAddress
								billing={billing.data}
								onCancel={() => setShowAddressForm(!showAddressForm)}
							/>
						</Box>
					)
				}
			</Box>
			<Box>
				<Typography type="h3" noMargin gutterBottom>
					Invoices
				</Typography>
				<Box margin={{ bottom: 'medium' }}>
					<ViewInvoicesContainer />
				</Box>
			</Box>
		</Content>
	);
};


export default PaymentContainer;
