import { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createWorkspace } from '../store/actions';
import { useAuth0 } from '../../../services/Auth0';

const CreateWorkspace = ({
	children,
	redirectOnCreate = true,
	createWorkspace,
	history,
}) => {
	const { getIdToken, loginWithPopup } = useAuth0();
	const [error, setError] = useState();
	const [formData, setFormData] = useState();
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = useCallback(async (payload) => {
		setFormData(payload);
		setSubmitting(true);

		let token;
		try {
			token = await getIdToken();
		} catch (e) {
			await loginWithPopup();
			token = await getIdToken();
		}

		try {
			await createWorkspace(payload, { token });

			// Once created, it will be auto-selected and
			// the user will be logged in. All we have to
			// do is redirect.
			setTimeout(() => {
				if (redirectOnCreate) {
					history.push('/');
				}
			}, 10);
		} catch (e) {
			setSubmitting(false);
			setError(e);
		}
	}, [createWorkspace, getIdToken, history, loginWithPopup, redirectOnCreate]);

	return children({
		error,
		formData,
		onSubmit,
		submitting,
	});
};

const mapDispatchToProps = {
	createWorkspace,
};

export default withRouter(connect(null, mapDispatchToProps)(CreateWorkspace));
