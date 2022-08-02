/**
 * Join Room Schema
 */
export default {
	definitions: {},
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'http://example.com/root.json',
	type: 'object',
	title: 'Join Room',
	required: [
		'password',
		'name'
	],
	properties: {
		password: {
			$id: '#/properties/password',
			type: 'string',
			title: 'Room Password',
			default: '',
			examples: []
		},
		name: {
			$id: '#/properties/name',
			type: 'string',
			title: 'Your Name',
			default: '',
			examples: []
		},
	},
};

export const uiSchema = {
	password: {
		'ui:widget': 'password',
	},
};
