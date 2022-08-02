import React, { Fragment } from 'react';

import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import ItemTag from './tagTypes/ItemTag';
import ParentTag from './tagTypes/ParentTag';
import ActiveTag from './tagTypes/ActiveTag';

const isActive = (tag, activeTags) => {
	return activeTags.find(active => active.tagPath === tag.tagPath);
};

const TagList = ({ activeTags, tags, onExpand, onAdd, onRemove, parent, listLeafs }) => {
	let items;
	let Component = ItemTag;
	let Extra = () => <div />;

	if (listLeafs) {
		items = tags.filter(tag => tag.parentTagId);
	} else if (parent) {
		items = tags.filter(tag => tag.parentTagId === parent.tagId);
		Extra = () => <ParentTag tag={parent} onExpand={() => onExpand(null)} close />;
	} else {
		items = tags.filter(tag => !tag.parentTagId);
		Component = ParentTag;
	}

	return (
		<Fragment>
			<Extra />
			{
				items.length === 0 && (
					<Box margin={{ left: 'small', right: 'small' }}>
						<Typography color="darkGray">
							{!parent ? 'No categories' : 'No tags in this category'}
						</Typography>
					</Box>
				)
			}
			 {items.length > 0 &&
				items.map((item) => {
					if (isActive(item, activeTags)) {
						return (
							<ActiveTag
								key={item.tagPath}
								tag={item}
								onRemove={onRemove}
							/>
						);
					}

					return (
						<Component
							key={item.tagPath}
							tag={item}
							activeTags={activeTags}
							onExpand={onExpand}
							onAdd={onAdd}
						/>
					);
				})
			}
		</Fragment>
	);
};

export default TagList;
