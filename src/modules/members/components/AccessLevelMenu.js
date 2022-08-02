import React, { Fragment, useRef, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { Menu, MenuItem, MenuItemDivider } from '@clarityhub/unity-web/lib/components/Menu';
import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import colors from '@clarityhub/unity-core/lib/colors';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import { ButtonSet } from '@clarityhub/unity-web/lib/components/Buttons';
import {
	CardBody,
	CardActions,
} from '@clarityhub/unity-web/lib/components/Card';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

const mapRole = (role) => {
	switch (role) {
	case 'guest':
		return 'viewer';
	default:
		return role;
	}
};

const Note = styled.span`
    display: block;
    font-size: 0.8rem;
    font-weight: normal;
    color: ${colors.darkGray.default};

    max-width: 300px;
    white-space: normal;

`;

const AccessLevelMenu = ({
	me,
	userId,
	role,
	update,
	kick,
	leave,
}) => {
	const menuRef = useRef();
	const [confirmLeave, setConfirmLeave] = useState(false);
	const [confirmKick, setConfirmKick] = useState(false);
	const onUpdate = useCallback((role) => (e) => {
		update(userId, { role });

		// close the menu
		menuRef.current.close();
	}, [update, userId]);

	const showKick = useCallback(() => {
		menuRef.current.close();
		setConfirmKick(true);
	}, []);
	const closeKick = useCallback(() => {
		setConfirmKick(false);
	}, []);
	const onKick = useCallback((e) => {
		kick(userId);
		closeKick();
	}, [closeKick, kick, userId]);

	// leave callbacks
	const showLeave = useCallback(() => {
		menuRef.current.close();
		setConfirmLeave(true);
	}, []);
	const closeLeave = useCallback(() => {
		setConfirmLeave(false);
	}, []);
	const onLeave = useCallback((e) => {
		leave(userId);
		closeLeave();
	}, [closeLeave, leave, userId]);

	const isMe = userId === me.userId;

	return (
		<Fragment>

			<Modal open={confirmKick} onClose={closeKick}>
				<CardBody>
					<Typography type="h3">Remove this User?</Typography>
					<Typography type="text">Are you sure you want to remove this user from this workspace?</Typography>

					<CardActions>
						<ButtonSet spread>
							<Button text onClick={closeKick}>
								Cancel
							</Button>
							<Button
								type="danger"
								onClick={onKick}
							>
								Remove User
							</Button>
						</ButtonSet>
					</CardActions>
				</CardBody>
			</Modal>

			<Modal open={confirmLeave} onClose={closeLeave}>
				<CardBody>
					<Typography type="h3">Are you sure you want to leave?</Typography>
					<Typography type="text">Once you leave this workspace, you will need an other admin to reinvite you back in if you want to rejoin it.</Typography>

					<CardActions>
						<ButtonSet spread>
							<Button text onClick={closeLeave}>
								Cancel
							</Button>
							<Button
								type="danger"
								onClick={onLeave}
							>
								Leave
							</Button>
						</ButtonSet>
					</CardActions>
				</CardBody>
			</Modal>

			<Menu
				ref={menuRef}
				items={[
					<MenuItem onClick={onUpdate('guest')}>
						Viewer
						<Note>
							Can only view content in the workspace.
						</Note>
					</MenuItem>,
					<MenuItem onClick={onUpdate('member')}>
						Member
						<Note>
							Can create, read, edit, and delete content in the workspace.
						</Note>
					</MenuItem>,
					<MenuItem onClick={onUpdate('admin')}>
						Admin
						<Note>
							Can change workspace settings and invite new members to the workspace.
						</Note>
					</MenuItem>,
					<MenuItemDivider />,
					!isMe && <MenuItem type="danger" onClick={showKick}>Remove from Workspace</MenuItem>,
					isMe && <MenuItem type="danger" onClick={showLeave}>Leave Workspace</MenuItem>,
				].filter(Boolean)}
			>
				{({ open }) => <Button text onClick={open}>
					{mapRole(role)}
					{' '}
					<Icon path={mdiChevronDown}
						title="Open"
						color="currentColor"
						size={0.7}

					/>
				</Button>}
			</Menu>
		</Fragment>
	);
};

export default AccessLevelMenu;
