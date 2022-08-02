import { css } from '@emotion/core';
import styled from '@emotion/styled';
import colors from '@clarityhub/unity-core/lib/colors';

const FloatingHoverButton = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	display: none;

	background-color: ${colors.white.default};
	box-shadow: ${colors.shadow.default};
    border-radius: 4px;

	${({ active }) => active && css`
		display: block;
	`}
`;

export default FloatingHoverButton;
