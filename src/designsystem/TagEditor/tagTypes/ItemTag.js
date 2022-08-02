import React from 'react';
import { mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';

import ItemBadge from './ItemBadge';
import TagWrapper from './TagWrapper';
import IconWrapper from './IconWrapper';

const ItemTag = ({ tag, onAdd }) => {
	return (
		<TagWrapper onClick={() => onAdd(tag)}>
			<IconWrapper>
				<Icon
					path={mdiCheck}
					title="Select"
					color="transparent"
					size={0.8}
				/>
			</IconWrapper>

			<ItemBadge tag={tag} />
		</TagWrapper>
	);
};

export default ItemTag;
