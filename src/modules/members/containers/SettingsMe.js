import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

import Profile from '../components/Profile';
import { getMe, updateMetadata } from '../store/actions';

const SettingsMeContainer = ({ isReady, error, getMe, updateMetadata, user }) => {
	useEffect(() => {
		getMe();
	}, [getMe]);

	if (!isReady) {
		return (
			<Loading flex size={2} />
		);
	}

	if (error) {
		return <Error error={error} />;
	}

	return (
		<Profile
			user={user}
			onUpdate={updateMetadata}
			editable
		/>
	);
};

const mapStateToProps = (state) => ({
	user: state.members.me,
	isReady: state.members.hasLoadedMe,
	error: state.members.error,
});

const mapDispatchToProps = {
	getMe,
	updateMetadata,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMeContainer);
