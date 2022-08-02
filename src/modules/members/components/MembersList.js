import React, { Fragment, useCallback, useState } from 'react';
import { JSONAPITable } from '@clarityhub/unity-web/lib/components/Table';
import Badge from '@clarityhub/unity-web/lib/components/Badge';
import Button from '@clarityhub/unity-web/lib/components/Buttons';

import Toolbar from '@clarityhub/unity-web/lib/components/Toolbar';

import AccessLevelMenu from './AccessLevelMenu';
import InviteModal from './InviteModal';

const MembersList = ({
	me,
	members,
	invite,
	resendInvite,
	leave,
	kick,
	update,
}) => {
	const [openInviteModal, setOpenInviteModal] = useState(false);

	const onOpenInviteModal = useCallback((e) => {
		e.preventDefault();

		setOpenInviteModal(true);
	}, []);

	const onCloseInviteModal = useCallback(() => {
		setOpenInviteModal(false);
	}, []);

	const onInvite = useCallback(async (email) => {
		await invite({ email, role: 'member' });

		setOpenInviteModal(false);
	}, [invite]);

	return (
		<Fragment>
			<InviteModal
				open={openInviteModal}
				onClose={onCloseInviteModal}
				onSubmit={onInvite}
			/>

			<Toolbar>
				<Toolbar.Action>
					<Button
						size="small"
						type="primary"
						onClick={onOpenInviteModal}
					>
                        Add a Member
					</Button>
				</Toolbar.Action>

				{/* <ToolbarFilter /> */}
			</Toolbar>

			<JSONAPITable
				columns={[
					['Email', 'email'],
					['', (data) => {
						if (data.status === 'INVITED') {
							return (
								<Badge type="primary">Invited</Badge>
							);
						}
						return null;
					}],
					['Access Level', (data) => {
						return (
							<AccessLevelMenu
								me={me}
								userId={data.userId}
								role={data.role}
								leave={leave}
								kick={kick}
								update={update}
							/>
						);
					}],
					['', (data) => {
						if (data.status === 'INVITED') {
							const oneHourAgo = new Date().valueOf() - (60 * 60 * 1000);
							const invitedAt = new Date(data.invitedAt).valueOf();
							const disabled = invitedAt > oneHourAgo;
							return (
								<Button
									disabled={disabled}
									type={disabled ? 'default' : 'primary'}
									outline
									size="small"
									onClick={() => {
										resendInvite(data.userId);
									}}
								>
									Resend Invite
								</Button>
							);
						}
						return null;
					}],
				]}
				data={{
					data: members,
				}}
			/>

		</Fragment>
	);
};

export default MembersList;
