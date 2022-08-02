import React from 'react';
import { shallow } from 'enzyme';
import DashboardCallout from './DashboardCallout';

describe('<DashboardCallout />', () => {
	it('renders children in a card', () => {
		const wrapper = shallow(
			<DashboardCallout
				to="/"
			>
				<div>Test</div>
			</DashboardCallout>,
		);

		expect(wrapper.find('Card')).toHaveLength(1);
		expect(wrapper.text()).toBe('Test');
	});
});
