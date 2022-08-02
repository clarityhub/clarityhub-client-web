import React from 'react';
import { mount } from 'enzyme';
import ViewAnnouncements from './ViewAnnouncements';

describe('<ViewAnnouncements />', () => {
	it('should mount', () => {
		const wrapper = mount(<ViewAnnouncements />);

		wrapper.unmount();
	});

	it('renders posts', () => {
		const posts = [{
			image: 'http://image.com',
			title: 'title1',
			summary: 'summary1',
			url: 'http://google.com',
		}];

		const wrapper = mount(<ViewAnnouncements posts={posts} />);

		expect(wrapper.text()).toContain('title1');
		expect(wrapper.text()).toContain('summary1');

		wrapper.unmount();
	});
});
