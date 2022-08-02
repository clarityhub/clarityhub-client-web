import { StoreSerializer } from './store';

describe('StoreSerializer', () => {
	it('omits paths from store', () => {
		const storeSerializer = new StoreSerializer({
			key: 'test_key',
			paths: ['session'],
			ignorePaths: ['session.loggingIn'],
			version: '1.0',
		});

		storeSerializer.save({
			session: {
				test: 1,
				loggingIn: true,
			},
		});

		const payload = storeSerializer.load();

		expect(payload.session).toBeTruthy();
		expect(payload.session.test).toBe(1);
		expect(typeof payload.session.loggingIn).toBe('undefined');
	});
});
