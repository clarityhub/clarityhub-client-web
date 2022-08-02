import styled from '@emotion/styled';
import spacing from '@clarityhub/unity-core/lib/spacing';
import breakpoints from '@clarityhub/unity-web/lib/theme/breakpoints';

const Content = styled.div`
    flex: 1;

    margin-top: ${spacing.small}rem;
    margin-left: ${spacing.large}rem;
    margin-right: ${spacing.large}rem;
    margin-bottom: ${spacing.small}rem;

    @media(max-width: ${breakpoints.tablet}) {
        margin-top: ${spacing.xsmall}rem;
        margin-left: ${spacing.small}rem;
        margin-right: ${spacing.small}rem;
        margin-bottom: ${spacing.xsmall}rem;
    }
`;

export default Content;
