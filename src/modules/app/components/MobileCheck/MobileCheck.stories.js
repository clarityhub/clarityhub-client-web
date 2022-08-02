import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import MobileCheck from './MobileCheck';

export default {
	title: 'MobileCheck',
	component: MobileCheck,
	decorators: [withKnobs],
};

export const Default = () => {
	window.localStorage.setItem('mobile-check-dismissed', false);
	return (
		<MobileCheck
			showIOS={boolean('Show iOS', true)}
			showAndroid={boolean('Show Android', true)}
		/>
	);
};
