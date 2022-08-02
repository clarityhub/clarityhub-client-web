import React, { useCallback, useEffect, forwardRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

import { openRightPane } from 'modules/app/store/actions';
import { updateInterview } from 'modules/interviews/store/actions';
import {
	getVideoCall,
	startSession,
	endSession,
	joinSession,
	deleteVideoCall,
	updateVideoCall,
} from '../store/actions';
import VideoCallPanel from '../components/VideoCallPanel';

const VideoCallPanelContainer = forwardRef(({
	parentId,
	videoCallId,
	referencePath,
	tagInfo,
	flat,

	history,
	isReady,
	error,
	videoCall,
	getVideoCall,
	openRightPane,

	startSession,
	endSession,
	joinSession,
	deleteVideoCall,
	updateInterview,
	updateVideoCall,

	...attributes
}, ref) => {
	const load = useCallback(() => {
		getVideoCall(videoCallId);
	}, [getVideoCall, videoCallId]);

	useEffect(() => {
		if (!isReady) {
			load();
		}
	}, [isReady, load]);

	let content = null;

	if (!isReady) {
		content = <Loading />;
	} else if (error) {
		content = <Error error={error} refresh />;
	} else {
		content = (
			<VideoCallPanel
				referencePath={referencePath}
				parentId={parentId}
				videoCall={videoCall}
				tagInfo={tagInfo}
				startSession={startSession}
				endSession={endSession}
				joinSession={joinSession}
				deleteVideoCall={deleteVideoCall}
				updateInterview={updateInterview}
				updateVideoCall={updateVideoCall}
				flat={flat}
			/>
		);
	}

	return (
		<div {...attributes} ref={ref}>
			{content}
		</div>
	);
});

const mapStateToProps = (state, props) => {
	const { videoCallId } = props;

	const videoCall = state.videoCalls.items.find(item => item.id === videoCallId);

	return {
		isReady: videoCall,
		videoCall,
		error: state.videoCalls.error,
	};
};

const mapDispatchToProps = {
	getVideoCall,
	openRightPane,
	startSession,
	endSession,
	joinSession,
	deleteVideoCall,
	updateInterview,
	updateVideoCall,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
	forwardRef: true,
})(VideoCallPanelContainer));
