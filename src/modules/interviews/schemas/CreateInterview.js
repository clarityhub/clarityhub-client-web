/**
 * Create interview schema
 */
export default {
	definitions: {},
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'http://example.com/root.json',
	type: 'object',
	title: 'Create Interview',
	required: [
		'title',
	],
	properties: {
		title: {
			$id: '#/properties/title',
			type: 'string',
			title: 'Interview Name',
			default: '',
			examples: ['Interview with Steve'],
		},
	},
};
