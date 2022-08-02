import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import FullFormLayout from 'modules/app/layouts/FullFormLayout';

import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

const LoginErrorOrRedirect = ({ location }) => {
	const parsed = queryString.parse(location.search);

	if (parsed.error) {
		// Show error
		return (
			<FullFormLayout>
				<Error refresh="/" error={parsed.error_description || 'Unauthorized: You are unable to login'} />
			</FullFormLayout>
		);
	}

	return (
		<Redirect to="/auth" />
	);
};

export default LoginErrorOrRedirect;
