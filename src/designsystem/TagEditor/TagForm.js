import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import colors from '@clarityhub/unity-core/lib/colors';

import ItemBadge from './tagTypes/ItemBadge';
import IconWrapper from './tagTypes/IconWrapper';
import CreateForm from './CreateForm';

const TagFormWrapper = styled.div`
	border-top: 1px solid ${colors.gray.default};
	margin-top: 0.5rem;
`;

const TagForm = ({ parent, onCreateTag, suggestedTag }) => {
	return (
		<TagFormWrapper>
			<CreateForm
				onAdd={(text) => onCreateTag(text, parent)}
				key={parent}
				placeholder={parent ? 'Tag name…' : 'Category name…'}
				suggestedTag={suggestedTag}
			>
				{
					parent ? (
						<Fragment>
							<IconWrapper>
								<Icon
									path={mdiPlus}
									title="Select"
									color="currentColor"
									size={0.8}
								/>
							</IconWrapper>

							<ItemBadge
								small
								noBackground
								tag={{ tag: 'Create Tag' }}
							/>
						</Fragment>
					) : (
						<Fragment>
							<IconWrapper>
								<Icon
									path={mdiPlus}
									title="Select"
									color="currentColor"
									size={0.8}
								/>
							</IconWrapper>

							<ItemBadge
								small
								noBackground
								tag={{ tag: 'Create Category' }}
							/>
						</Fragment>
					)
				}
			</CreateForm>
		</TagFormWrapper>
	);
};

export default TagForm;
