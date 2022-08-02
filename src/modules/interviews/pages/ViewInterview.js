import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import Page from 'modules/app/layouts/Page';
import { createNotebook, setCurrentNotebook, updateNotebook } from 'modules/notebooks/store/actions';
import { useLocale } from '@clarityhub/unity-web/lib/contexts/Localization';
import generateTitle from 'modules/notebooks/utilities/generateTitle';
import createContentWithEmbed from 'modules/notebooks/utilities/createContentWithEmbed';

import InterviewDetails from '../components/InterviewDetails';
import InterviewMediaContainer from '../containers/InterviewMediaContainer';
import InterviewNotebooksContainer from '../containers/InterviewNotebooksContainer';
import { getInterview, updateInterview } from '../store/actions';

const ViewInterview = ({
	match,
	error,
	isReady,
	interview,
	getInterview,
	updateInterview,

	createNotebook,
	history,
}) => {
	const { interviewId } = match.params;
	const [locale] = useLocale();

	const doSideEffects = useCallback(async () => {
		await getInterview(interviewId, {
			forceGet: false,
		});
	}, [getInterview, interviewId]);

	const handleChangeDetails = useCallback(async (details) => {
		await updateInterview(interviewId, details);
	}, [interviewId, updateInterview]);

	const handleEmbedInNotebook = useCallback(async () => {
		// create a notebook with an embedded object...
		const title = generateTitle({
			prefix: interview ? interview.title: undefined,
			locale,
		});

		const content = createContentWithEmbed({
			object: 'block',
			type: 'interview',
			data: {
				id: interview.id,
			},
		});

		const notebook = await createNotebook({
			title,
			content,
		});

		await updateInterview(interview.id, {
			notebookIds: [
				notebook.id,
				...interview.notebookIds || [],
			],
		});
		await setCurrentNotebook(notebook);

		history.push(`/notebooks/${notebook.id}`);
	}, [createNotebook, history, interview, locale, updateInterview]);

	useEffect(() => {
		if (!error) {
			doSideEffects();
		}
	}, [doSideEffects, error]);

	if (!isReady) {
		return <Loading flex size={2} />;
	}

	if (isReady && !interview) {
		return (
			<Error error={'Interview not found'} />
		);
	}

	if (error) {
		return (
			<Error error={error} />
		);
	}

	return (
		<Page
			title={interview.title}
			crumbs={[
				{
					title: 'Home',
					path: '/',
				},
				{
					title: 'Interviews',
					path: '/interviews',
				},
				{
					title: interview.title,
				},
			]}
			hideTitle
		>
			<InterviewDetails
				interview={interview}
				onChangeDetails={handleChangeDetails}
				onEmbedInNotebook={handleEmbedInNotebook}
			/>

			<InterviewMediaContainer
				interview={interview}
			/>

			<InterviewNotebooksContainer
				interview={interview}
			/>
		</Page>
	);
};

const mapStateToProps = (state, props) => {
	const { interviewId } = props.match.params;

	return {
		interview: state.interviews.items.find(interview => interview.id === interviewId),
		isReady: state.interviews.isReady,
		error: state.interviews.error,
		workspaceStatus: state.session.accessTokenDecoded.workspaceStatus,
	};
};

const mapDispatchToProps = {
	getInterview,
	updateInterview,
	createNotebook,
	updateNotebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewInterview));
