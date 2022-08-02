import React, { Fragment, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';

import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

import MembersList from '../components/MembersList';

import {
	getAllMembers,
	invite,
	resendInvite,
	kick,
	update,
	leave,
} from '../store/actions';

const MembersListContainer = ({
	me,
	loading,
	members,
	error,
	getAllMembers,
	invite,
	resendInvite,
	kick,
	update,
	leave,
}) => {
	const doSideEffects = useCallback(() => {
		getAllMembers();
	}, [getAllMembers]);

	useEffect(() => {
		doSideEffects();
	}, [doSideEffects]);

	if (loading) {
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

			{members && (
				<MembersList
					me={me}
					members={members}
					invite={invite}
					resendInvite={resendInvite}
					kick={kick}
					update={update}
					leave={leave}
				/>
			)}
		</Fragment>
	);
};


const mapStateToProps = (state) => {
	return {
		loading: !state.members.hasLoadedAll,
		members: state.members.items,
		error: state.members.error,
		me: state.members.me,
	};
};

const mapDispatchToProps = {
	getAllMembers,
	invite,
	resendInvite,
	kick,
	update,
	leave,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersListContainer);
