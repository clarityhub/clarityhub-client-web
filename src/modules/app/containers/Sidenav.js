import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from 'modules/auth/store/actions';

import {
	openLeftPane,
	closeLeftPane,
} from '../store/actions';
import Sidenav from '../components/Sidenav';

const SidenavContainer = ({ isOpen, history, logout, workspace, openLeftPane, closeLeftPane }) => {
	const switchWorkspace = useCallback(() => {
		history.push('/settings/my-workspaces');
	}, [history]);

	return (
		<Sidenav
			isReady
			switchWorkspace={switchWorkspace}
			openLeftPane={openLeftPane}
			closeLeftPane={closeLeftPane}
			isOpen={isOpen}
			logout={logout}
			workspace={workspace}
		/>
	);
};

const mapStateToProps = (state) => {
	const { currentWorkspaceId } = state.session;

	const workspace = state.workspaces.items.find(workspace => {
		return workspace.id === currentWorkspaceId;
	});

	return {
		isOpen: state.app.leftNav.isOpen,
		workspace,
	};
};

const mapDispatchToProps = {
	logout,
	openLeftPane,
	closeLeftPane,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidenavContainer));
