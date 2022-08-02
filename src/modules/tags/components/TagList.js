import React from 'react';
import styled from '@emotion/styled';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { Menu } from '@clarityhub/unity-web/lib/components/Menu';
import Badge from '@clarityhub/unity-web/lib/components/Badge';

import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import TagEditor from 'designsystem/TagEditor';
import ItemBadge from 'designsystem/TagEditor/tagTypes/ItemBadge';

const Tags = styled.div`
	> * + * {
		margin-left: 0.5rem;
	}
`;

const TagList = ({
	noAdd,
	loading,
	error,
	tags,
	activeTags,
	onCreate,
	onAdd,
	onRemove,
}) => {
	if (error) {
		return <Error error={error} />;
	}

	if (loading) {
		return <Typography>Loading Tags…</Typography>;
	}

	// Map active tags to tag
	const activeTagTags = activeTags.map(at => {
		return tags.find((tag) => tag.tagPath === at.tagPath);
	});

	return (
		<Tags>
			{activeTagTags.map((tag) => {
				return (
					<ItemBadge
						key={tag.tagPath}
						tag={tag}
						small
					/>
				);
			})}

			{!noAdd && (
				<div style={{ display: 'inline-block' }}>
					<Menu
						content={
							<TagEditor
								activeTags={activeTags}
								tags={tags}
								onAddTag={onAdd}
								onCreateTag={onCreate}
								onRemoveTag={onRemove}
							/>
						}
					>
						{({ open }) => (
							<Badge outline noTransform square onClick={open} as="button">
								+ Tag
							</Badge>
						)}
					</Menu>
				</div>
			)}
		</Tags>
	);
};

export default TagList;
