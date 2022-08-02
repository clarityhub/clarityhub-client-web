/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';

import generateColor from '../utilities/generateColor';
import ItemBadge from './ItemBadge';
import TagWrapper from './TagWrapper';

const Swatch = styled.div`
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 2px;
    margin-left: 0.4rem;
    margin-right: 0.9rem;

	${({ small }) => small && css`
		width: 0.9rem;
    	height: 0.9rem;
		margin-right: 0.2rem;
	`}
`;

const ParentTag = ({ tag, onExpand, close = false }) => {
	return (
		<TagWrapper onClick={() => onExpand(tag)}>
			{
				close && (
					<Icon
						path={mdiChevronRight}
						title="Back"
						color="currentColor"
						size={0.8}
						horizontal
					/>
				)
			}

			{
				(
					<Swatch
						small={close}
						css={css`
                            background-color: ${generateColor(tag.color)};
                        `}
					/>
				)
			}

			<div style={{ flex: 1 }}>
				<ItemBadge
					noBackground
					small={close}
					tag={tag}
				/>
			</div>

			{
				!close && (
					<Icon
						path={mdiChevronRight}
						title="Open"
						color="currentColor"
						size={0.8}
					/>
				)
			}
		</TagWrapper>
	);
};

export default ParentTag;
