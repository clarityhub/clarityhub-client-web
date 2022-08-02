import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import FullPageLoader from 'modules/app/layouts/FullPageLoader';

import { getMe } from 'modules/members/store/actions';
import { get as getWorkspace } from 'modules/workspaces/store/actions';
import { getAll as getOnboarding } from 'modules/onboarding/store/actions';
import { getAll as getTags } from 'modules/tags/store/actions';

const BootstrapContainer = ({ currentWorkspaceId, isLoading, getMe, getTags, getWorkspace, getOnboarding, error, children }) => {
	const doSideEffects = useCallback(() => {
		getMe();
		getWorkspace(currentWorkspaceId);
		getOnboarding();
		getTags();
	}, [currentWorkspaceId, getMe, getOnboarding, getTags, getWorkspace]);

	useEffect(() => {
		doSideEffects();
	}, [doSideEffects]);

	return (
		<FullPageLoader
			error={error}
			loading={isLoading}
			render={() => {
				return children;
			}}
		/>
	);
};

const mapStateToProps = (state) => {
	const { currentWorkspaceId } = state.session;

	const workspace = state.workspaces.items.find(workspace => {
		return workspace.id === currentWorkspaceId;
	});

	const onboardingDone = state.onboarding.hasLoadedAll;
	const onboardingError = state.onboarding.error;
	const meDone = state.members.hasLoadedMe;
	const meError = state.members.getMeError;
	const workspaceDone = state.workspaces.isReady && workspace;
	const workspaceError = state.workspaces.errorCurrentWorkspace;

	return {
		currentWorkspaceId,
		error: onboardingError || meError || workspaceError,
		isLoading: !onboardingDone || !meDone || !workspaceDone,
	};
};

const mapDispatchToProps = {
	getMe,
	getWorkspace,
	getOnboarding,
	getTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(BootstrapContainer);
