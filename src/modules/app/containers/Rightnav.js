import React from 'react';
import { connect } from 'react-redux';

import { resetRightPane } from '../store/actions';

import Rightnav from '../components/Rightnav';

const SidenavContainer = ({ isOpen, when, view, resetRightPane }) => {

	return (
		<Rightnav
			isOpen={isOpen}
			when={when}
			view={view}
			onClose={resetRightPane}
		/>
	);
};

const mapStateToProps = (state) => {
	return {
		isOpen: state.app.rightNav.isOpen,
		view: state.app.rightNav.view,
		when: state.app.rightNav.when,
	};
};

const mapDispatchToProps = {
	resetRightPane,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidenavContainer);
