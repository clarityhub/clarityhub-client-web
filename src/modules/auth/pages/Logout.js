import React, { useEffect } from 'react';
import FullPageLoader from '../../app/layouts/FullPageLoader';
import { useAuth0 } from '../../../services/Auth0';

const Logout = () => {
	const { logout } = useAuth0();

	useEffect(() => {
		logout();
	});

	return <FullPageLoader loading />;
};

export default Logout;
