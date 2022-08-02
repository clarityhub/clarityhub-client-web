import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import Page from 'modules/app/layouts/Page';
import { mdiAccountVoice } from '@mdi/js';

import { getAll as getInterviews, deleteInterview } from '../store/actions';
import InterviewList from '../components/InterviewList';

const Interviews = ({ getInterviews, deleteInterview, interviews, error, hasLoadedAll }) => {
	const doSideEffects = useCallback(() => {
		if (!hasLoadedAll) {
			getInterviews();
		}
	}, [getInterviews, hasLoadedAll]);

	useEffect(() => {
		doSideEffects();
	}, [doSideEffects]);

	return (
		<Page
			icon={mdiAccountVoice}
			title="All Interviews"
			crumbs={[
				{
					title: 'Home',
					path: '/',
				},
				{
					title: 'Interviews',
				},
			]}
		>
			<InterviewList
				interviews={interviews}
				error={error}
				isReady={hasLoadedAll}
				onDelete={deleteInterview}
			/>
		</Page>
	);
};

const mapStateToProps = (state) => {
	// Map tags to interviews
	const interviews = state.interviews.items.map((notebook) => {
		const mapping = state.tags.tagItems.items[`interviewV2:${notebook.id}`];

		const meta = {
			tags: (mapping && mapping.items.map((tagItem) => {
				return state.tags.tags.items.find(tag => tag.tagPath === tagItem.tagPath);
			}).filter(Boolean)) || [],
		};

		return {
			...notebook,
			meta,
		};
	});

	return {
		hasLoadedAll: state.interviews.hasLoadedAll,
		interviews,
		error: state.interviews.error,
	};
};

const mapDispatchToProps = {
	getInterviews,
	deleteInterview,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interviews);
