import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { variants } from '@clarityhub/unity-core/lib/typography';
import { Menu, MenuItem, MenuItemDivider } from '@clarityhub/unity-web/lib/components/Menu';
import { mdiChevronUp, mdiOpenInNew } from '@mdi/js';
import Icon from '@mdi/react';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

const Header = styled.span`
    font-family: ${variants.text.fontFamily};
    font-size: 1.1rem;
	font-weight: 800;

	display: inline-block;

	overflow: hidden;
  	text-overflow: ellipsis;
	max-width: 90%;
	white-space: nowrap;
	
	svg {
		vertical-align: middle;
	}
`;

const NoStyleButton = styled.button`
	background: transparent;
	border: 0;
	cursor: pointer;
	text-align: left;
	width: 100%;
`;

const SidenavWorkspaceHeader = ({ error, isReady, workspace, switchWorkspace, logout }) => {
	const onSwitchWorkspace = useCallback((e) => {
		e.preventDefault();

		switchWorkspace();
	}, [switchWorkspace]);

	const onStatusPage = useCallback((e) => {
		e.preventDefault();

		const win = window.open('https://status.clarityhub.io', '_blank');
		win.focus();
	}, []);

	const onLogout = useCallback((e) => {
		e.preventDefault();

		logout({ force: true });
	}, [logout]);

	let content = null;

	if (error && !workspace) {
		content = <Error error={error} variant="thin" />;
	}

	if (!isReady) {
		content = <Loading size={0.8} />;
	}

	if (!content) {
		content = workspace.name;
	}

	return (
		<Box margin={{ top: 'small', left: 'small', right: 'small', bottom: 'medium' }}>
			<Menu
				items={[
					<MenuItem onClick={onSwitchWorkspace}>Switch Workspace</MenuItem>,
					<MenuItemDivider />,
					<MenuItem onClick={onStatusPage}>
						Clarity Hub Status
						{' '}
						<Icon path={mdiOpenInNew}
							title="Open"
							color="currentColor"
							size={0.7}
						/>
					</MenuItem>,
					<MenuItemDivider />,
					<MenuItem onClick={onLogout}>Logout</MenuItem>,
				]}
			>
				{({ open }) => (
					<NoStyleButton onClick={open}>
						<Typography type="h3" noMargin noPadding>
							<Header>
								{content}
							</Header>
							<Icon path={mdiChevronUp}
								title="Open"
								color="currentColor"
								size={0.7}
								vertical
							/>
						</Typography>
					</NoStyleButton>
				)}
			</Menu>
		</Box>
	);
};

export default SidenavWorkspaceHeader;
