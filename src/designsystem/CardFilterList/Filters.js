/** @jsx jsx */
import { Fragment, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import breakpoints from '@clarityhub/unity-web/lib/theme/breakpoints';
import ItemBadge from '../TagEditor/tagTypes/ItemBadge';

const WrapperBox = styled(Box)`
	flex-direction: row;

    @media(max-width: ${breakpoints.tablet}) {
		flex-direction: column;
    }
`;

const InputBox = styled(Box)`
	transition: width 0.2s ease-in;
	width: ${({ isActive }) => isActive ? '400px' : '150px'};

	@media(max-width: ${breakpoints.tablet}) {
		width: 100%;
    }
`;

const Filters = ({ onFilter, actions, tags }) => {
	const [search, setSearch] = useState('');
	const [filters, setFilters] = useState({});
	const [isActive, setActive] = useState(false);

	const onChange = useCallback((e) => {
		const nextSearch = e.target.value;
		const nextFilters = {
			...filters,
			text: nextSearch,
		};

		setSearch(nextSearch);
		setFilters(nextFilters);

		onFilter(nextFilters);
	}, [filters, onFilter]);

	const onClickTag = useCallback((tag) => (e) => {
		e.preventDefault();

		const nextSearch = `${tag.tag}`;
		const nextFilters = {
			...filters,
			text: nextSearch,
		};

		setSearch(nextSearch);
		setFilters(nextFilters);

		onFilter(nextFilters);
	}, [filters, onFilter]);

	return (
		<WrapperBox flex={1}>
			<Box flex={1} direction="row">
				{tags && tags.length > 0 && (
					<Box gap="small" direction="row" style={{ alignItems: 'center' }}>
						<Box>
							<Typography type="sectionLabel" color="darkGray">
								Popular Tags
							</Typography>
						</Box>
						{tags.map((tag) => (
							<Box key={tag.tagPath}>
								<ItemBadge
									tag={tag}
									as="button"
									style={{ cursor: 'pointer' }}
									onClick={onClickTag(tag)}
								/>
							</Box>
						))}
					</Box>
				)}
			</Box>
			<Box direction="row" gap="small">
				<InputBox isActive={isActive}>

					<LabelledInput
						prefixIcon={
							<Icon
								path={mdiMagnify}
								title="Search"
								color="currentColor"
								size={1}
							/>
						}
						autoComplete="off"
						label="Filter..."
						onChange={onChange}
						value={search}
						onFocus={() => setActive(true)}
						onBlur={() => setActive(false)}
					/>
				</InputBox>
				<Box
					direction="row"
				>
					{actions.map((action, i) => (
						<Fragment key={i}>
							{action}
						</Fragment>
					))}
				</Box>
			</Box>
		</WrapperBox>
	);
};

export default Filters;
