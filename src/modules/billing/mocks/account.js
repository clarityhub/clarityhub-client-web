import { SUBSCRIPTION } from './plan';

export const ADDRESS = {
	email: 'email@test.com',
	address1: '1423 Penny Ln',
	city: 'Kansas City',
	state: 'KS',
	postal: 52309,
};

export const PAYMENT = {
	ccLastFour: '8902',
	ccExpiration: '10/24',
	ccCardType: 'visa',
};

export const NO_PAYMENT = null;
export const NO_ADDRESS = null;

export const ACCOUNT = {
	...ADDRESS,
	...PAYMENT,
	subscription: SUBSCRIPTION,
};
