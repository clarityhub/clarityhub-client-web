/** @jsx jsx */
import { arrayOf, oneOfType, any } from 'prop-types';
import { jsx } from '@emotion/core';
import { Fragment, useCallback, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { Empty } from '@clarityhub/unity-web/lib/components/Messaging';

import { GridLayout, GridItem } from '@clarityhub/unity-web/lib/scaffolding/Grid';

import MenuItemRenderer from './MenuItemRenderer';
import Filters from './Filters';

const CardWrapper = styled.div`
	position: relative;
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
`;

export const Cards = ({ empty: CardEmpty = Empty, items, children, CreateCard }) => {
	if (!items || items.length === 0) {
		if (CardEmpty) {
			return (
				<Box margin={{ top: 'medium' }}>
					<CardEmpty />
				</Box>
			);
		}

		return null;
	}

	return (
		<Box margin={{ top: 'medium' }}>
			<GridLayout>
				{items.map((item) => {
					return (
						<GridItem key={item.id}>
							{children({ item })}
						</GridItem>
					);
				})}

				{CreateCard && (
					<GridItem>
						<CreateCard />
					</GridItem>
				)}
			</GridLayout>
		</Box>
	);
};

const CardFilterList = ({
	actions,
	empty,
	items,
	menuItems,
	search,
	createCard: CreateCard,
	itemRenderer: ItemRenderer,
	tags,
	defaultSort = (items) => items,
}) => {
	const [sortedFilteredItems, setSortedFilteredItems] = useState(items);

	const sort = useCallback((items) => {
		return defaultSort(items);
	}, [defaultSort]);

	const onFilter = useCallback((filters) => {
		const foundItems = items.filter((item) => {
			return search(item, filters);
		});

		setSortedFilteredItems(sort(foundItems));
	}, [items, search, sort]);

	useEffect(() => {
		setSortedFilteredItems(sort(items));
	}, [items, sort]);

	return (
		<Fragment>
			<Filters
				actions={actions}
				tags={tags}
				onFilter={onFilter}
			/>

			<Cards empty={empty} items={sortedFilteredItems} sortBy="updatedAt" CreateCard={CreateCard}>
				{({ item }) => (
					<CardWrapper key={item.id}>
						<MenuItemRenderer
							menuItems={menuItems}
							item={item}
						/>

						<ItemRenderer
							item={item}
						/>
					</CardWrapper>
				)}
			</Cards>

		</Fragment>
	);
};

CardFilterList.propTypes = {
	actions: arrayOf(oneOfType([
		any,
	])),
};

export default CardFilterList;
