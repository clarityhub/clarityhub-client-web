import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import colors from '@clarityhub/unity-core/lib/colors';

import ActiveTag from './tagTypes/ActiveTag';

const mapItemTagToTag = (itemTag, tags) => {
	const found = tags.find(t => t.tagPath === itemTag.tagPath);

	return {
		...found,
		itemTag,
	};
};

const ActiveTagsWrapper = styled.div(
	({ numberOfItems }) => numberOfItems > 0 && css`
		margin-bottom: 0.5rem;
		padding-bottom: 0.5rem;
        border-bottom: 1px solid ${colors.gray.default};
    `,
);

const ActiveTags = ({ tags, activeTags, onRemove }) => {
	const mapped = activeTags.map((activeTag) => {
		return mapItemTagToTag(activeTag, tags);
	});

	return (
		<ActiveTagsWrapper numberOfItems={mapped.length}>
			{mapped.map(item => {
				return (
					<ActiveTag
						tag={item}
						onRemove={onRemove}
					/>
				);
			})}
		</ActiveTagsWrapper>
	);
};

export default ActiveTags;
