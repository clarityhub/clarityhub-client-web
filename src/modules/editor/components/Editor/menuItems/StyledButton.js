import styled from '@emotion/styled';
import { css } from '@emotion/core';
import colors from '@clarityhub/unity-core/lib/colors';
import { types } from '@clarityhub/unity-web/lib/theme/fonts';

const StyledButton = styled.button`
    ${types.text}

    border: 0;
    background: transparent;
    color: gray;
    cursor: pointer;
    padding: 6px;
    margin: 0 !important;
    vertical-align: middle;

    &:hover {
        background-color: ${colors.muted.default};
    }

    * {
        vertical-align: middle;
    }

    ${({ active }) => active && css`
        color: ${colors.primary.default};
        font-weight: bold;
    `}

    ${({ fullWidth }) => fullWidth && css`
        text-align: left;
        display: block;
        width: 100%;
    `}
`;

export default StyledButton;
