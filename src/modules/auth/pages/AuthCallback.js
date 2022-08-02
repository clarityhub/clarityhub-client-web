import React, { useEffect, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../store/actions';
import { useAuth0 } from '../../../services/Auth0';
import FullPageLoader from '../../app/layouts/FullPageLoader';

const AuthCallback = ({ history, login }) => {
	const [error, setError] = useState(null);
	const { getIdToken } = useAuth0();

	const callApi = useCallback(async () => {
		try {
			const token = await getIdToken();
			await login({ token });

			history.push('/workspaces/pick');
		} catch (e) {
			setError(e);
		}
	}, [getIdToken, history, login]);

	useEffect(() => {
		callApi();
	}, [callApi]);

	return (
		<FullPageLoader
			error={error}
			loading
		/>
	);
};

const mapDispatchToProps = {
	login,
};

export default withRouter(connect(null, mapDispatchToProps)(AuthCallback));
