/**
 * Create/Update tag details
 */
export default {
	definitions: {},
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'http://example.com/root.json',
	type: 'object',
	title: 'Tag Details',
	required: [
		'tag',
	],
	properties: {
		tag: {
			$id: '#/properties/tag',
			type: 'string',
			title: 'Tag',
			default: '',
			examples: ['Persona', 'Billing'],
		},
		color: {
			$id: '#/properties/color',
			type: ['string'],
			title: 'Color',
			default: '#CCCCCC',
		},
	},
};
