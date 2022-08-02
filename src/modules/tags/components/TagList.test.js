import React from 'react';
import { mount } from 'enzyme';
import TagList from './TagList';

describe('<TagList />', () => {
	it('shows error', () => {
		const wrapper = mount(
			<TagList
				error={'Something bad happened'}
			/>,
		);

		expect(wrapper.text()).toBe('Something bad happened');
	});

	it('shows loading state', () => {
		const wrapper = mount(
			<TagList
				loading
			/>,
		);

		expect(wrapper.text()).toContain('Loading');
	});
});
