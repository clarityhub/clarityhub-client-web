import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Breadcrumbs from '@clarityhub/unity-web/lib/components/Breadcrumbs';
import breakpoints from '@clarityhub/unity-web/lib/theme/breakpoints';
import colors from '@clarityhub/unity-core/lib/colors';

import { DOUBLE_LEFT_SIDENAV_WIDTH, LEFT_SIDENAV_WIDTH, RIGHT_SIDENAV_WIDTH, BREADCRUMB_HEIGHT } from '../config';

const Wrapper = styled.div`
	background-color: white;
    font-size: 0.9rem;
	position: fixed;
	top: 0;
	max-width: 100%;
	height: ${BREADCRUMB_HEIGHT};
	right: ${({ isOpen }) => isOpen ? RIGHT_SIDENAV_WIDTH : 0};
	left: ${({ includesInnerSidenav }) => {
		return includesInnerSidenav ? DOUBLE_LEFT_SIDENAV_WIDTH : LEFT_SIDENAV_WIDTH;
	}};
	z-index: 1000;
	display: flex;
	align-items: center;

	@media(max-width: ${breakpoints.tablet}) {
		flex-wrap: wrap;

		left: 0;
		padding-left: 2rem;
		right: 0;
		border-bottom: 1px solid ${colors.muted.default};
	}
`;

const AppBreadcrumbs = ({ includesInnerSidenav, isOpen, crumbs }) => (
	<Wrapper includesInnerSidenav={includesInnerSidenav} isOpen={isOpen}>
		<Breadcrumbs
			linkRenderer={({ path, children }) => <Link to={path}>{children}</Link>}
			crumbs={crumbs}
		/>
	</Wrapper>
);

export default AppBreadcrumbs;
