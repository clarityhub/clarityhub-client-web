import React from 'react';
import { mount } from 'enzyme';

import ImagePanel from './ImagePanel';

describe('<ImagePanel/>', () => {
	it('is a react component', () => {
		expect(typeof ImagePanel).toBe('function');
	});

	it('renders an image', () => {
		const wrapper = mount(<ImagePanel media={{
			presignedUrl: 'http://placehold.it/800x800',
			filename: 'image.jpeg',
		}} />);

		expect(wrapper.find('Img')).toHaveLength(1);
	});
});
