import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import Icon from '@mdi/react';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';

const Span = styled.span`
    height: 1.5rem;
    vertical-align: top;
    padding-right: 0.5rem;
`;

const Link = styled.a`
	display: block;
	width: 100%;
    text-decoration: none;
	background-color: ${props => props.selected ? 'rgba(4,15,26,0.1)' : 'rgba(0,0,0,0)'};
	transition: background-color ease 0.3s;

	&:hover {
		background-color: rgba(4,15,26,0.1);
	}
`;

const SidenavItem = withRouter(({ history, icon, title, to, location, onBeforeNavigate }) => {
	const onClick = useCallback((e) => {
		e.preventDefault();

		onBeforeNavigate && onBeforeNavigate();

		history.push(to);
	}, [history, onBeforeNavigate, to]);

	const selected = location.pathname === to;

	return (
		<Link href={to} onClick={onClick} selected={selected}>
			<Box margin={{ top: 'xsmall', left: 'small', right: 'small', bottom: 'xsmall' }} direction="row">
				<Span>
					<Icon path={icon}
						title={title}
						size={1}
					/>
				</Span>
				<Typography noMargin noPadding component={Span} css={{ fontWeight: selected && '800' }}>
					{title}
				</Typography>

			</Box>
		</Link>
	);
});


export default SidenavItem;
