/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
	CardElement,
} from 'react-stripe-elements';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Card, { CardBody, CardHeader } from '@clarityhub/unity-web/lib/components/Card';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';
import Toggle from '@clarityhub/unity-web/lib/components/Toggle';
import CardDetails from 'modules/billing/components/CardDetails';
import stripeCardOptions from 'modules/billing/utilities/stripeCardOptions';
import useFeedback from 'modules/billing/utilities/useFeedback';
import stripeStyles from 'modules/billing/utilities/stripeStyles';
import billingSchema from 'modules/billing/utilities/billingSchema';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { formatCurrency } from 'utilities/currency';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput/LabelledInput';

const pickPlan = (plans, interval) => {
	const plan = plans.data.find((plan) => {
		if (!plan.nickname.includes('Premium')) {
			return false;
		}
		return plan.interval === (interval ? 'year' : 'month');
	});

	return plan;
};

const fullSchema = {
	definitions: {},
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'http://example.com/root.json',
	type: 'object',
	title: 'Upgrade Plan',
	properties: {
		paymentDetails: {
			type: 'object',
			title: 'Payment Details',
		},
		orgDetails: {
			type: 'object',
			title: 'Organization Details',
			required: [
				...billingSchema.required,
			],
			properties: {
				...billingSchema.properties,
			},
		},
		planDetails: {
			type: 'object',
			title: 'Plan Details',
			properties: {
				coupon: {
					type: 'string',
					title: 'Coupon Code',
				},
				interval: {
					type: 'boolean',
					title: 'interval',
				},
			},
		},
	},
};

const uiSchema = {
	orgDetails: {
		classNames: 'test',
	},
	paymentDetails: {
		'ui:field': ({ formData: paymentDetails }) => {
			return (
				<Box flex={1}>
					<Typography type="h2" noPadding>
						Payment Details
					</Typography>
					{paymentDetails && paymentDetails.card.hasData ? (
						<Card>
							<CardHeader>
								Credit Card
							</CardHeader>
							<CardBody>
								<Box direction="row" margin={{ top: 'medium' }} align="center">
									<CardDetails card={paymentDetails} />
								</Box>
							</CardBody>
						</Card>
					) : (
						<CardElement
							{...stripeCardOptions}
						/>
					)}
				</Box>
			);
		},
	},
	planDetails: {
		'ui:field': ({ formData: planDetails, onChange }) => {
			const { coupon, plans, interval, numberOfSeats } = planDetails;

			const plan = pickPlan(plans, interval);

			return (
				<Box flex={1}>
					<Typography type="h2" noMargin noPadding>
						Plan Details
					</Typography>

					<Box margin={{ top: 'medium' }}>
						<Toggle
							labelLeft={<b>Monthly</b>}
							labelRight={<b>Yearly</b>}
							checked={interval}
							onClick={() => {
								const newPlan = pickPlan(plans, !interval);
								onChange({
									...planDetails,
									plan: newPlan,
									interval: !interval,
								});
							}}
							type="button"
						/>
					</Box>

					<Box margin={{ top: 'medium' }}>
						<LabelledInput
							label="Coupon Code"
							value={coupon}
							onChange={(e) => {
								onChange({
									...planDetails,
									coupon: e.target.value,
								});
							}}
						/>
					</Box>

					<Box margin={{ top: 'medium' }}>
						<Typography noMargin noPadding style={{ margin: 0 }}>
							<strong>Plan</strong>: $<strong>
								{formatCurrency(plan.amount / 100, {
									maximumFractionDigits: 0,
									style: 'decimal',
								})}
							</strong>
						/user/{plan.interval}
						</Typography>
						<Typography>
							<strong>Total</strong>: $<strong>
								{formatCurrency(numberOfSeats * plan.amount / 100, {
									maximumFractionDigits: 0,
									style: 'decimal',
								})}
							</strong>
							{' '}
						for {numberOfSeats} member{numberOfSeats === 1 ? '' : 's'}
						</Typography>

					</Box>

				</Box>
			);
		},
	},
};

const UpgradePlan = ({ defaultPlan, billing, onSubmit, status, plans, error, submitting, formData }) => {
	const renderFeedback = useFeedback(status, error);
	const plan = defaultPlan ? defaultPlan : pickPlan(plans, false);
	const interval = defaultPlan.interval !== 'month';

	return (
		<Box margin={{ bottom: 'medium' }}>
			<div css={stripeStyles}>
				{renderFeedback()}

				<Box>
					<FormFromSchema
						hideTitle
						// additionalButtons={() => {
						// 	return <Button onClick={onCancel}>Cancel</Button>;
						// }}
						formData={formData || {
							paymentDetails: billing.data,
							orgDetails: billing.data,
							planDetails: {
								coupon: '',
								interval,
								plan,
								plans,
								numberOfSeats: billing.data.numberOfSeats,
							},
						}}
						uiSchema={uiSchema}
						onSubmit={onSubmit}
						schema={fullSchema}
						submitting={submitting}
					/>
				</Box>
			</div>
		</Box>
	);
};

export default UpgradePlan;
