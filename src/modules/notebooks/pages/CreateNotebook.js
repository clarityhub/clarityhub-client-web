import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import { useLocale } from '@clarityhub/unity-web/lib/contexts/Localization';
import { createNotebook, setCurrentNotebook } from '../store/actions';
import generateTitle from '../utilities/generateTitle';

/**
 * This component has side-effects when mounted
 */
const CreateNotebook = ({ createNotebook, setCurrentNotebook, history }) => {
	const [locale] = useLocale();
	const [error, setError] = useState(null);
	const doSideEffects = useCallback(async () => {
		try {
			const title = generateTitle({ locale });

			const notebook = await createNotebook({
				title,
			});

			await setCurrentNotebook(notebook);

			history.push(`/notebooks/${notebook.id}`);
		} catch (e) {
			setError(e);
		}
	}, [createNotebook, history, locale, setCurrentNotebook]);

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
	createNotebook,
	setCurrentNotebook,
};

export default withRouter(connect(null, mapDispatchToProps)(CreateNotebook));
