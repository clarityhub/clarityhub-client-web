import React, { useState } from 'react';
import { mdiCheck, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

import TagWrapper from './TagWrapper';
import ItemBadge from './ItemBadge';
import IconWrapper from './IconWrapper';


const ActiveTag = ({ tag, onRemove }) => {
	const [hovering, setHovering] = useState(false);

	return (
		<TagWrapper
			onClick={() => onRemove(tag)}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<IconWrapper>
				<Icon
					path={hovering ? mdiClose : mdiCheck}
					title="Remove"
					color="currentColor"
					size={0.8}
				/>
			</IconWrapper>

			<ItemBadge tag={tag} />
		</TagWrapper>
	);
};

export default ActiveTag;
