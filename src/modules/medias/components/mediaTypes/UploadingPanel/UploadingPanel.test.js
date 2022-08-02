import React from 'react';
import { shallow, mount } from 'enzyme';
import UploadingPanel from '.';

describe('<UploadingPanel />', () => {
	it('is a react component', () => {
		expect(typeof UploadingPanel).toBe('function');
	});

	it('renders a card', () => {
		const wrapper = shallow(<UploadingPanel media={{
			meta: {
				status: 'uploading',
				progress: 80,
			},
		}} />);

		expect(wrapper.find('Card')).toHaveLength(1);
	});

	it('renders uploading text', () => {
		const wrapper = mount(<UploadingPanel media={{
			meta: {
				status: 'uploading',
				progress: 80,
			},
		}} />);

		expect(wrapper.text()).toContain('Uploading');
	});

	it('renders error text', () => {
		const wrapper = mount(<UploadingPanel media={{
			meta: {
				status: 'error',
				progress: 80,
			},
		}} />);

		expect(wrapper.text()).toContain('Upload Failed');
	});
});
