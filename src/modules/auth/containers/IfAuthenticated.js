import React from 'react';
import { node, func, oneOfType } from 'prop-types';
import { connect } from 'react-redux';

import FullPageLoader from 'modules/app/layouts/FullPageLoader';
import { useAuth0 } from '../../../services/Auth0';

const IfAuthenticated = ({ isLoggedIn, render: Render, fallback: Fallback }) => {
	const { loading } = useAuth0();

	if (loading) {
		return <FullPageLoader loading />;

	}

	if (isLoggedIn) {
		return <Render />;
	}

	if (Fallback) {
		return <Fallback />;
	}

	return null;
};

IfAuthenticated.propTypes = {
	fallback: oneOfType([func, node]),
	render: oneOfType([func, node]).isRequired,
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.session.refreshToken,
	};
};

export default connect(mapStateToProps)(IfAuthenticated);
