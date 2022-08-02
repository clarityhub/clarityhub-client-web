import { css } from '@emotion/core';
import colors from '@clarityhub/unity-core/lib/colors';

/**
 * Common Stripe global styles.
 *
 * Usage:
 *
 * ```
 * <div css={stripeStyles}>
 * 	{content}
 * </div>
 * ```
 */
const stripeStyles = css`
    .StripeElement {
		display: block;
		margin: 10px 0 20px 0;
		max-width: 500px;
		max-height: 22px;
		padding: 10px 14px;
		/* font-size: 1rem; */
		border: 1px solid ${colors.gray.default};
		outline: 0;
		border-radius: 4px;
		background: white;
		font-family: 'Open Sans', Arial, sans-serif;
    }

    .StripeElement--focus {
		border-color: ${colors.primary.default};
		-webkit-transition: all 150ms ease;
		transition: all 150ms ease;
    }
`;

export default stripeStyles;
