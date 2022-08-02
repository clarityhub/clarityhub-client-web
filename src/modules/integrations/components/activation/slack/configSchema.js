export default {
	definitions: {},
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'http://example.com/root.json',
	type: 'object',
	title: 'Billing Details',
	required: [
		'channel',
	],
	properties: {
		channel: {
			$id: '#/properties/channel',
			type: 'string',
			title: 'Channel*',
			default: '#interviews',
			examples: ['interviews'],
		},
		title: {
			$id: '#/properties/title',
			type: 'string',
			title: 'Title',
			default: 'Slack',
			examples: ['Slack'],
		},
		description: {
			$id: '#/properties/description',
			type: 'string',
			title: 'Description',
			default: '',
			examples: ['Slack'],
		},
	},
};
