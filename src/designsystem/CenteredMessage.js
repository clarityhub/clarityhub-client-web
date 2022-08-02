import styled from '@emotion/styled';

const CenteredMessage = styled.div`
    position: absolute;
    width: ${({ suggestedWidth }) => suggestedWidth || '300px'};
    max-width: 90vw;
    z-index: 15;
    top: 50%;
    left: 50%;
    margin: 0;
    transform: translate(-50%, -50%);
`;

export default CenteredMessage;
