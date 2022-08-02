import React from 'react';
import styled from '@emotion/styled';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';

import PlainInput from 'designsystem/PlainInput';

import IconWrapper from './tagTypes/IconWrapper';

const TagSearchWrapper = styled.div`
	align-items: center;
	display: flex;
`;

const TagSearch = ({
	filter,
	onFilter,
}) => {
	return (
		<TagSearchWrapper>
			<IconWrapper>
				<Icon
					path={mdiMagnify}
					title="Find"
					color="grey"
					size={0.8}
				/>
			</IconWrapper>
			<PlainInput
				placeholder="Search"
				value={filter}
				onChange={(e) => onFilter(e.target.value)}
			/>
		</TagSearchWrapper>
	);
};

export default TagSearch;
