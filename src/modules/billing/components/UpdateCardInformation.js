/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { connect } from 'react-redux';
import {
	CardElement,
	injectStripe,
} from 'react-stripe-elements';

import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Button from '@clarityhub/unity-web/lib/components/Button';
import ButtonSet from '@clarityhub/unity-web/lib/components/ButtonSet';
import Typography from '@clarityhub/unity-web/lib/components/Typography/Typography';
import { formatCurrency } from 'utilities/currency';
import { updateBilling } from '../store/actions';
import stripeCardOptions from '../utilities/stripeCardOptions';
import useFeedback from '../utilities/useFeedback';
import stripeStyles from '../utilities/stripeStyles';

// TODO move to utilities
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const getNextBillingDate = (billingData, locale = 'en-US') => {
	if (billingData && billingData.upcomingInvoice) {
		const date = new Date(billingData.upcomingInvoice.next_payment_attempt * 1000);

		return date.toLocaleDateString(locale, dateOptions);
	}
	return 'unknown';

};

const getNextInvoiceAmount = (billingData) => {
	if (billingData && billingData.upcomingInvoice) {
		return `$${formatCurrency(billingData.upcomingInvoice.amount_due / 100, {
			maximumFractionDigits: 0,
			style: 'decimal',
		})}`;
	}
	return 'unknown';

};

const CardInformation = ({
	billing,
	stripe,
	updateBilling,
	onCancel,
	canCancel = false,
}) => {
	const [status, setStatus] = useState('pristine');
	const renderFeedback = useFeedback(status);

	const handleSubmit = async (ev) => {
		ev.preventDefault();
		setStatus('loading');
		let { token } = await stripe.createToken({ name: 'Name' });

		if (token) {
			await updateBilling({
				token: token.id,
			});

			setStatus('success');
		}
		setStatus('error');
	};


	return (
		<form onSubmit={handleSubmit}>
			<div css={stripeStyles}>
				{renderFeedback}
				<Card flat type="highlight">
					<CardBody>
						<Typography>
							{/* TODO pass in locale here */}
							This new card will be invoiced {getNextInvoiceAmount(billing.data)} on {getNextBillingDate(billing.data)}.
						</Typography>
					</CardBody>
				</Card>
				<CardElement
					{...stripeCardOptions}
				/>
				<ButtonSet>
					{
						canCancel ? (
							<Button
								onClick={onCancel}
							>
								Cancel
							</Button>
						) :
							null

					}
					<Button
						type="primary"
						buttonType="submit"
						loading={status === 'loading'}
					>
						Save Card
					</Button>
				</ButtonSet>
			</div>
		</form>
	);
};

const mapDispatchToProps = {
	updateBilling,
};

export default connect(
	null,
	mapDispatchToProps,
)(injectStripe(CardInformation));
