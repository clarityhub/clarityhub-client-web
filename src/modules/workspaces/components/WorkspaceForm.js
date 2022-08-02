import React from 'react';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';

import schema from '../configs/schema';

const WorkspaceForm = ({
	error,
	formData,
	onSubmit,
	submitting,
	submitText,
}) => {
	// TODO handle error

	return (
		<FormFromSchema
			hideTitle
			onSubmit={onSubmit}
			schema={schema}
			formData={formData}
			submitText={submitText}
			submitting={submitting}
		/>
	);
};

export default WorkspaceForm;
