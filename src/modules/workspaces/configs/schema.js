const schema = {
	'definitions': {},
	'$schema': 'http://json-schema.org/draft-07/schema#',
	'$id': 'http://example.com/root.json',
	'type': 'object',
	'title': 'Your Workspace',
	'required': [
		'name',
	],
	'properties': {
		'name': {
			'$id': '#/properties/name',
			'type': 'string',
			'title': 'Workspace Name',
			'default': '',
			'pattern': '^(.*)$',
		},
	},
};

export default schema;
