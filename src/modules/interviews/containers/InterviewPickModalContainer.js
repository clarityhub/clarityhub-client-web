import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Empty } from '@clarityhub/unity-web/lib/components/Messaging';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import { getAll as getInterviews } from '../store/actions';
import InterviewList from '../components/InterviewList';

const InterviewPickModalContainer = ({ open, onPick, onClose, getInterviews, interviews, error, hasLoadedAll }) => {
	const doSideEffects = useCallback(() => {
		if (!hasLoadedAll) {
			getInterviews();
		}
	}, [getInterviews, hasLoadedAll]);

	const handlePick = (interview) => {
		return onPick(interview);
	};

	useEffect(() => {
		doSideEffects();
	}, [doSideEffects]);

	return (
		<Modal open={open} onClose={onClose} size="large">
			<CardBody>
				<InterviewList
					interviews={interviews}
					error={error}
					isReady={hasLoadedAll}
					onClick={handlePick}

					hideCreate
					empty={
						<Empty
							message="No interviews found"
							details="Create an interview first, then you can embed it in a notebook"
						/>
					}
				/>
			</CardBody>
		</Modal>
	);
};

const mapStateToProps = (state) => {
	// Map tags to interviews
	// TODO refactor tag mapping
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
};

export default connect(mapStateToProps, mapDispatchToProps)(InterviewPickModalContainer);
