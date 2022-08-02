import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import colors from '@clarityhub/unity-core/lib/colors';
import { variants } from '@clarityhub/unity-core/lib/typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// XXX List and ListItem should be moved to unity

const List = styled.div`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const ListItemStyled = styled.div([
	css`
    	box-sizing: border-box;
		overflow: visible;
        display: inline-block;

        ${variants.button.string}

        box-shadow: ${colors.shadow.default};
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 1rem 1.25rem;
        font-size: 1rem;
        line-height: 1.5;
        position: relative;
        text-decoration: none;
        text-transform: uppercase;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
		background-color: rgba(255, 255, 255, 1);
		border-color: transparent;
		color: ${colors.primary.default};

		border-radius: 0;
		text-align: left;
		text-transform: none;
		min-width: 150px;
		width: 100%;
	`,
	({ button }) => button && css`
		cursor: pointer;

		&:hover,
		&.active {
			background-color: ${colors.muted.default};
			border-color: transparent;
			color: ${colors.dark.default};
		}
	`,
]);

const ListItem = ({ button, ...props }) => {
	const component = button ? 'button' : 'div';

	return <ListItemStyled as={component} button={button} {...props} />;
};

const PickWorkspaceList = ({
	workspaces,
	onPick,
}) => (
	<List>
		{workspaces.map(workspace => (
			<ListItem
				key={workspace.id}
				button
				onClick={() => onPick(workspace.id)}
			>
				<span style={{ float: 'right' }}>
					<ChevronRightIcon />
				</span>

				{workspace.name}
			</ListItem>
		))}
	</List>
);

export default PickWorkspaceList;
