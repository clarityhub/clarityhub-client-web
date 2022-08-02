import React, { useCallback, useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { getInterview } from '../store/actions';
import InterviewPanel from '../components/InterviewPanel';

const InterviewPanelContainer = forwardRef(({
	interviewId,

	error,
	history,
	getInterview,
	isReady,
	interview,
	...props
}, ref) => {
	const onViewInterview = useCallback(() => {
		history.push(`/interviews/${interviewId}`);
	}, [history, interviewId]);

	const load = useCallback(() => {
		getInterview(interviewId);
	}, [getInterview, interviewId]);

	useEffect(() => {
		if (!isReady) {
			load();
		}
	}, [isReady, load]);

	let content = null;

	if (!isReady) {
		content = <Loading />;
	} else if (error) {
		content = <div>Error...</div>;
	} else {
		content = (
			<InterviewPanel
				interview={interview}
				onViewInterview={onViewInterview}
			/>
		);
	}

	return (
		<div {...props} ref={ref}>
			{content}
		</div>
	);
});

const mapStateToProps = (state, props) => {
	const { interviewId } = props;

	const interview = state.interviews.items.find(item => item.id === interviewId);

	return {
		isReady: interview,
		interview,
		error: state.interviews.error,
	};
};

const mapDispatchToProps = {
	getInterview,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
	forwardRef: true,
})(InterviewPanelContainer));
