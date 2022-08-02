import React, { Fragment } from 'react';
import { any, func } from 'prop-types';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

import interviewSchema from '../schemas/CreateInterview';

const CreateInterviewForm = ({ error, onCreate }) => {
	return (
		<Fragment>
			{error &&
				<Error error={error} />
			}
			<FormFromSchema
				hideTitle
				formData={{}}
				onSubmit={onCreate}
				schema={interviewSchema}
			/>
		</Fragment>
	);
};

CreateInterviewForm.propTypes = {
	error: any,
	onCreate: func.isRequired,
};

export default CreateInterviewForm;
