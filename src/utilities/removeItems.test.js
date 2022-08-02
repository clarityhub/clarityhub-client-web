import removeItems from './removeItems';

const ITEM = {
	id: '1',
	text: 'old',
};

describe('removeItems', () => {
	it('removes item from empty list', () => {
		expect(removeItems([], '1')).toStrictEqual([]);
	});

	it('removes single item', () => {
		expect(removeItems([ITEM], '1')).toStrictEqual([]);
	});

	it('removes item by accessor', () => {
		const item1 = {
			id: '1',
			uuid: '111',
			text: 'old',
		};
		const item2 = {
			id: '2',
			uuid: '1',
			text: 'other',
		};

		expect(removeItems([item1, item2], '1', 'uuid')).toStrictEqual([item1]);
	});

	it('removes array of one item', () => {
		const item1 = {
			id: '1',
			uuid: '111',
			text: 'old',
		};
		const item2 = {
			id: '2',
			uuid: '1',
			text: 'other',
		};
		const item3 = {
			id: '3',
			uuid: '133',
			text: 'other',
		};

		expect(removeItems([item1, item2, item3], ['111'], 'uuid')).toStrictEqual([item2, item3]);
	});

	it('removes multiple items', () => {
		const item1 = {
			id: '1',
			uuid: '111',
			text: 'old',
		};
		const item2 = {
			id: '2',
			uuid: '1',
			text: 'other',
		};
		const item3 = {
			id: '3',
			uuid: '133',
			text: 'other',
		};

		expect(removeItems([item1, item2, item3], ['111', '1'], 'uuid')).toStrictEqual([item3]);
	});
});
