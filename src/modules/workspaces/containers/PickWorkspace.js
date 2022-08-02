import { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginWorkspace } from '../../auth/store/actions';
import { useAuth0 } from '../../../services/Auth0';

const PickWorkspace = ({
	children,
	history,
	loginWorkspace,
}) => {
	const { getIdToken } = useAuth0();
	const [error, setError] = useState();

	const onPick = useCallback(async (workspaceId) => {
		try {
			const token = await getIdToken();

			await loginWorkspace(workspaceId, { token });

			setTimeout(() => {
				const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
				history.push(redirectUrl);
				localStorage.setItem('redirectAfterLogin', '');
			}, 10);
		} catch (e) {
			setError(e);
		}
	}, [getIdToken, history, loginWorkspace]);

	return children({
		onPick,
		error,
	});
};

const mapDispatchToProps = {
	loginWorkspace,
};

export default withRouter(connect(null, mapDispatchToProps)(PickWorkspace));
