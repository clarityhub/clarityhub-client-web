import styled from '@emotion/styled';
import colors from '@clarityhub/unity-core/lib/colors';

const TagWrapper = styled.button`
    background: rgba(255, 255, 255, 0.0);
    border: 0;
    cursor: pointer;
    display: flex;
    padding: 0.5rem;
    width: 100%;
    text-align: left;
    align-items: center;


    &:hover {
        background: ${colors.muted.default};
    }

    > * {
        vertical-align: middle;
    }
`;

export default TagWrapper;

