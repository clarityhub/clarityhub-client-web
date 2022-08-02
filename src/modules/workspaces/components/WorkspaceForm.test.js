import React from 'react';
import { mount } from 'enzyme';
import WorkspaceForm from './WorkspaceForm';

describe('<WorkspaceForm />', () => {
	it('mounts', () => {
		const wrapper = mount(
			<WorkspaceForm
				onSubmit={() => {}}
			/>,
		);

		expect(wrapper.find('form')).toHaveLength(1);
	});
});
