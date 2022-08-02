import React, { useState } from 'react';
import styled from '@emotion/styled';

import ItemBadge from 'designsystem/TagEditor/tagTypes/ItemBadge';

const PullRight = styled.div`
	position: absolute;
	left: 100%;
	padding-left: 1rem;
	margin-top: -1.6rem;
`;

const StyledFloatingTags = styled.div`
	background-color: white;
	padding: 0.5rem;
	position: relative;
	z-index: 100000;
`;

const FloatingTags = ({ tags }) => (
	<StyledFloatingTags>
		{tags.map((tag) => {
			return (
				<ItemBadge key={tag.tagPath} tag={tag} />
			);
		})}
	</StyledFloatingTags>
);

const TagsAside = ({ color, tags }) => {
	const [hover, setHover] = useState(false);

	let content = null;

	if (tags.length === 1) {
		content =
			<ItemBadge tag={tags[0]} />;
	} else {
		content = (
			<ItemBadge
				onMouseOver={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				tag={{
					color: color.replace('#', ''),
					tag: `${tags.length} tags`,
				}}
			/>
		);
	}

	return (
		<PullRight>
			{content}
			{hover && tags.length > 1 &&
				<FloatingTags tags={tags} />
			}
		</PullRight>
	);
};

export default TagsAside;
