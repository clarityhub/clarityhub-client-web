import React, { Fragment, useState } from 'react';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

import createVideoRoomSchema from '../schemas/CreateVideoRoom';

const VideoCallForm = ({ initialFormData, onSubmit, ...rest }) => {
	const [formState, setFormState] = useState(() => ({
		formData: initialFormData
	}));
	const [error, setError] = useState(null);

	const handleChange = (data) => {
		setFormState(state => ({
			...state,
			formData: data.formData,
		}));
	};

	const handleSubmit = async (formData) => {
		setFormState(state => ({
			...state,
			submitting: true,
		}));
		try {
			await onSubmit(formData);
		} catch (e) {
			setError(e);
		} finally {
			setFormState(state => ({
				...state,
				submitting: false,
			}));
		}
	};

	return (
		<Fragment>
			{error && <Error error={error} />}
			<FormFromSchema
				{...rest}
				{...formState}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={createVideoRoomSchema}
				submitText="Set Room Details"
			/>
		</Fragment>
	);
};

export default VideoCallForm;
