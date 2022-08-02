import React from 'react';
import { shallow, mount } from 'enzyme';
import DefaultPanel from './DefaultPanel';

describe('<DefaultPanel />', () => {
	it('is a react component', () => {
		expect(typeof DefaultPanel).toBe('function');
	});

	it('renders a card', () => {
		const wrapper = shallow(<DefaultPanel media={{
			filename: 'test.zip',
			presignedDownloadUrl: 'http://google.com',
		}} tagInfo={{}} />);

		expect(wrapper.find('Card')).toHaveLength(1);
	});

	it('renders uploading text', () => {
		const wrapper = mount(<DefaultPanel media={{
			filename: 'test.zip',
			presignedDownloadUrl: 'http://google.com',
		}} tagInfo={{}} />);

		expect(wrapper.text()).toContain('test.zip');
	});
});
