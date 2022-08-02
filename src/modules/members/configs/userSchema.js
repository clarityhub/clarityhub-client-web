export default {
	definitions: {},
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'http://example.com/root.json',
	type: 'object',
	title: 'Your Profile',
	required: ['name'],
	properties: {
		email: {
			$id: '#/properties/email',
			type: 'string',
			title: 'Email',
			default: '',
			pattern: '^(.*)$',
		},
		name: {
			$id: '#/properties/name',
			type: 'string',
			title: 'Name',
			default: '',
			pattern: '^(.*)$',
		},
		bio: {
			$id: '#/properties/description',
			type: 'string',
			title: 'Bio',
			default: '',
			pattern: '^(.*)$',
		},
	},
};
