import React from 'react';
import { shallow, mount } from 'enzyme';
import MobileCheck from './MobileCheck';

function setUserAgent(value) {
	window.navigator.userAgent = value;
}

describe('<MobileCheck />', () => {
	let old;

	beforeEach(() => {
		old = navigator.userAgent;

	});

	afterEach(() => {
		setUserAgent(old);
	});

	it('returns null', () => {
		const wrapper = shallow(
			<MobileCheck />,
		);

		expect(wrapper.find('div')).toHaveLength(0);
	});

	it('mounts', () => {
		setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');
		const wrapper = mount(
			<MobileCheck />,
		);

		expect(wrapper.text()).toContain('Mobile App');
	});

	it('has iOS link', () => {
		setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');
		const wrapper = mount(
			<MobileCheck />,
		);

		expect(wrapper.find('a')).toHaveLength(1);
	});

	it('has Android link', () => {
		setUserAgent('Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36');
		const wrapper = mount(
			<MobileCheck />,
		);

		expect(wrapper.find('a')).toHaveLength(1);
	});
});
