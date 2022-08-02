/**
 * Create Video Room schema
 */
export default {
	definitions: {},
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'http://example.com/root.json',
	type: 'object',
	title: 'Setup Room Details',
	required: [
		'videoName',
		'videoPassword',
	],
	properties: {
		videoName: {
			$id: '#/properties/videoName',
			type: 'string',
			title: 'Room Name',
			default: '',
			examples: ['Interview with Steve'],
		},
		videoPassword: {
			$id: '#/properties/videoPassword',
			type: 'string',
			title: 'Room Password',
			default: '',
			examples: [''],
		},
	},
};
