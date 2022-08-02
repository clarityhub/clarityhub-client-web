/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Badge from '@clarityhub/unity-web/lib/components/Badge';
import generateColor from '../utilities/generateColor';

const ItemBadge = ({ tag, small = false, noBackground = false, ...props }) => {
	return (
		<Badge
			css={css`
                font-size: ${small ? '0.8rem' : '1rem' };
                text-transform: none;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                font-weight: 500;
                border-radius: 5px;
                background-color: ${noBackground ? 'transparent' : generateColor(tag.color)};
            `}
			{...props}
		>
			{tag.tag || ''}
		</Badge>
	);
};

export default ItemBadge;
