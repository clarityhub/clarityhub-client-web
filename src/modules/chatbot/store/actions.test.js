import * as actions from './actions';

describe('chatbot actions', () => {
	describe('open', () => {
		it('is a function', () => {
			expect(typeof actions.open).toBe('function');
		});
	});

	describe('close', () => {
		it('is a function', () => {
			expect(typeof actions.close).toBe('function');
		});
	});

	describe('createConversation', () => {
		it('is a function', () => {
			expect(typeof actions.createConversation).toBe('function');
		});
	});

	describe('showDrift', () => {
		it('is a function', () => {
			expect(typeof actions.showDrift).toBe('function');
		});
	});

	describe('hideDrift', () => {
		it('is a function', () => {
			expect(typeof actions.hideDrift).toBe('function');
		});
	});

	describe('startDriftChat', () => {
		it('is a function', () => {
			expect(typeof actions.startDriftChat).toBe('function');
		});
	});
});
