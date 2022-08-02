import React from 'react';
import { connect } from 'react-redux';

import AppBreadcrumbs from '../components/AppBreadcrumbs';

const AppBreadcrumbsContainer = ({ isOpen, ...props }) => <AppBreadcrumbs isOpen={isOpen} {...props} />;
const mapStateToProps = (state) => {
	return {
		isOpen: state.app.rightNav.isOpen,
	};
};

export default connect(mapStateToProps)(AppBreadcrumbsContainer);
