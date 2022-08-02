import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';

import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import { loginWorkspace } from 'modules/auth/store/actions';

import WorkspacesList from '../components/WorkspacesList';
import { createWorkspace, getAllAuthed } from '../store/actions';
import { useAuth0 } from '../../../services/Auth0';

const WorkspacesListContainer = ({ getAllAuthed, isReady, createWorkspace, loginWorkspace, history, currentWorkspaceId, error, workspaces }) => {
	const { getIdToken, loginWithPopup } = useAuth0();
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!isReady) {
			getAllAuthed();
		}
	}, [isReady, getAllAuthed]);

	const onLoginWorkspace = useCallback(async (workspaceId) => {
		let token;
		try {
			token = await getIdToken();
		} catch (e) {
			await loginWithPopup();
			token = await getIdToken();
		}

		try {
			await loginWorkspace(workspaceId, { token });

			setTimeout(() => {
				history.push('/');
			}, 10);
		} catch (e) {
			// Do nothing for now
		}
	}, [getIdToken, history, loginWithPopup, loginWorkspace]);

	const onCreateWorkspace = useCallback(async (payload) => {
		setSubmitting(true);

		try {
			const token = await getIdToken();

			await createWorkspace(payload, { token });

			// Once created, it will be auto-selected and
			// the user will be logged in. All we have to
			// do is redirect.
			setTimeout(() => {
				history.push('/');
			}, 10);
		} catch (e) {
			setSubmitting(false);
			throw e;
		}
	}, [createWorkspace, getIdToken, history]);

	if (!isReady) {
		return (
			<Loading flex size={2} />
		);
	}

	return (
		<Fragment>
			{error && (
				<Box margin={{ bottom: 'small' }}>
					<Error error={error} />
				</Box>
			)}

			<WorkspacesList
				submitting={submitting}
				createWorkspace={onCreateWorkspace}
				loginWorkspace={onLoginWorkspace}
				workspaces={workspaces}
				currentWorkspaceId={currentWorkspaceId}
			/>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		currentWorkspaceId: state.session.currentWorkspaceId,
		isReady: state.workspaces.hasLoadedAll,
		workspaces: state.workspaces.items,
		error: state.workspaces.error,
	};
};

const mapDispatchToProps = {
	createWorkspace,
	loginWorkspace,
	getAllAuthed,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspacesListContainer));
