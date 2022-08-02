import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import { useLocale } from '@clarityhub/unity-web/lib/contexts/Localization';
import generateTitle from '../utilities/generateTitle';

import { createInterview } from '../store/actions';

const CreateInterview = ({ createInterview, history }) => {
	const [error, setError] = useState(null);
	const [locale] = useLocale();

	const handleCreateInterview = useCallback(async (data) => {
		try {
			const interview = await createInterview(data);

			history.push(`/interviews/${interview.id}`);
		} catch (error) {
			setError(error);
		}
	}, [createInterview, history]);

	const doSideEffects = useCallback(() => {
		const title = generateTitle({ locale });
		handleCreateInterview({
			title,
		});
	}, [handleCreateInterview, locale]);

	useEffect(() => {
		if (!error) {
			doSideEffects();
		}
	}, [doSideEffects, error]);


	if (error) {
		return (
			<Error error={error} />
		);
	}

	return (
		<Loading flex size={2} />
	);
};

const mapDispatchToProps = {
	createInterview,
};

export default connect(null, mapDispatchToProps)(withRouter(CreateInterview));
