import colors from '@clarityhub/unity-core/lib/colors';

/**
 * Striep <CardElement /> options.
 *
 * Usage:
 *
 * ```
 * <CardElement {...stripeCardOptions} />
 * ```
 */
export default {
	style: {
		base: {
			fontSize: '1.2rem',
			// fontFamily: 'Open Sans, Arial, sans-serif',
			// fontFamily: 'Source Code Pro, monospace',
			fontFamily: 'inherit',
			letterSpacing: '0.025em',
			color: colors.black.default,
			'::placeholder': {
				color: colors.gray.default,
			},
		},
		invalid: {
			color: colors.danger.default,
		},
	},
};
