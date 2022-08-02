export const TRIAL = {
	'id': 'plan_EeE4ns3bvb34ZP',
	'object': 'plan',
	'active': true,
	'aggregate_usage': null,
	'amount': 3000,
	'amount_decimal': '3000',
	'billing_scheme': 'per_unit',
	'created': 1551862832,
	'currency': 'usd',
	'interval': 'month',
	'interval_count': 1,
	'livemode': false,
	'metadata': {
		'order_id': '6735',
	},
	'nickname': 'ram',
	'product': 'prod_BT942zL7VcClrn',
	'tiers': null,
	'tiers_mode': null,
	'transform_usage': null,
	'trial_period_days': 14,
	'usage_type': 'licensed',
};

export const PREMIUM = {
	'id': 'plan_EeE4ns3bvb34ZP',
	'object': 'plan',
	'active': true,
	'aggregate_usage': null,
	'amount': 3000,
	'amount_decimal': '3000',
	'billing_scheme': 'per_unit',
	'created': 1551862832,
	'currency': 'usd',
	'interval': 'month',
	'interval_count': 1,
	'livemode': false,
	'metadata': {
		'order_id': '6735',
	},
	'nickname': 'Premium',
	'product': 'prod_BT942zL7VcClrn',
	'tiers': null,
	'tiers_mode': null,
	'transform_usage': null,
	'trial_period_days': null,
	'usage_type': 'licensed',
};

export const SUBSCRIPTION = {
	'id': 'sub_G4vabbxvGdz8w0',
	'object': 'subscription',
	'application_fee_percent': null,
	'billing_cycle_anchor': 1572321057,
	'billing_thresholds': null,
	'cancel_at_period_end': false,
	'canceled_at': null,
	'collection_method': 'charge_automatically',
	'created': 1572321057,
	'current_period_end': 1574999457,
	'current_period_start': 1572321057,
	'customer': 'cus_G4val6GJb1qSnb',
	'days_until_due': null,
	'default_payment_method': null,
	'default_source': null,
	'default_tax_rates': [],
	'discount': null,
	'ended_at': null,
	'items': {
		'object': 'list',
		'data': [
		],
		'has_more': false,
		'url': '/v1/subscription_items?subscription=sub_G4vabbxvGdz8w0',
	},
	'latest_invoice': null,
	'livemode': false,
	'metadata': {},
	'next_pending_invoice_item_invoice': null,
	'pending_invoice_item_interval': null,
	'pending_setup_intent': null,
	'plan': PREMIUM,
	'quantity': 1,
	'start_date': 1572321057,
	'status': 'trialing',
	'tax_percent': null,
	'trial_end': 1572351057,
	'trial_start': 1572321057,
};