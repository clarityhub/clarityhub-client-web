/**
 * Update billing details schema
 */
export default {
	definitions: {},
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'http://example.com/root.json',
	type: 'object',
	title: 'Billing Details',
	required: [
		'billingEmail',
		'line1',
		'city',
		'state',
		'postal_code',
		'country',
	],
	properties: {
		billingEmail: {
			$id: '#/properties/billingEmail',
			type: 'string',
			title: 'Billing Email',
			default: '',
			examples: ['ivan@clarityhub.io'],
		},
		line1: {
			$id: '#/properties/line1',
			type: ['string'],
			title: 'Address Line 1',
			default: '',
			examples: [],
		},
		line2: {
			$id: '#/properties/line2',
			type: ['string', 'null'],
			title: 'Address Line 2',
			default: '',
			examples: [],
		},
		city: {
			$id: '#/properties/city',
			type: ['string'],
			title: 'City',
			default: '',
			examples: [],
		},

		state: {
			$id: '#/properties/state',
			type: ['string'],
			title: 'State',
			default: '',
			examples: [],
		},
		postal_code: {
			$id: '#/properties/postal_code',
			type: ['string'],
			title: 'Postal Code',
			default: '',
			examples: [],
		},
		country: {
			$id: '#/properties/country',
			type: ['string'],
			title: 'Country',
			default: '',
			examples: [],
		},
	},
};
