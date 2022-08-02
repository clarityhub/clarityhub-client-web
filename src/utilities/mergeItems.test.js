import mergeItems from './mergeItems';

const ITEM_1 = {
	id: '1',
	text: 'new',
};
const ITEM_2 = {
	id: '2',
	text: 'old',
};

const EMPTY_ITEMS = [];
const LIST_ITEMS = [ITEM_2];

describe('mergeItems', () => {
	it('adds the item to the empty list', () => {
		expect(mergeItems(EMPTY_ITEMS, ITEM_1)).toStrictEqual([ITEM_1]);
	});

	it('adds the item to an existing list', () => {
		expect(mergeItems(LIST_ITEMS, ITEM_1)).toStrictEqual([ITEM_1, ITEM_2]);
	});

	it('merges items', () => {
		const listItems = [{
			id: '1',
			text: 'old',
		}];
		expect(mergeItems(listItems, ITEM_1)).toStrictEqual([ITEM_1]);
	});

	it('adds items by accessor', () => {
		const oldItem = {
			uuid: '1',
			text: 'old',
		};
		const listItems = [oldItem];
		const newItem = {
			uuid: '2',
			text: 'new',
		};
		expect(mergeItems(listItems, newItem, 'uuid')).toStrictEqual([newItem, oldItem]);
	});

	it('merges items by accessor', () => {
		const oldItem = {
			uuid: '1',
			text: 'old',
		};
		const listItems = [oldItem];
		const newItem = {
			uuid: '1',
			text: 'new',
		};
		expect(mergeItems(listItems, newItem, 'uuid')).toStrictEqual([newItem]);
	});
});
