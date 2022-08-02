import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { Switch, Route } from 'react-router';

import RecordPanel from './RecordPanel';

const FloatingRecordingPanel = styled.div`
    position: fixed;
    bottom: 1rem;
    width: 100%;
    max-width: 400px;
    transform: translateX(-50%);
    left: 50%;
`;

const NoMatch = () => null;

const FloatingRecordingPanelContainer = ({ isRecording, currentMediaId, status }) => {
	const showRecorder = isRecording ||
        status === 'STREAM_RECORDING_UPLOADING' ||
        status === 'STREAM_RECORDING_FINALIZING';


	if (!showRecorder) {
		return null;
	}

	return (
		<FloatingRecordingPanel>
			<RecordPanel mediaId={currentMediaId} dontResetRecording />
		</FloatingRecordingPanel>
	);
};

const mapStateToProps = (state) => {
	return {
		isRecording: state.recordings.isRecording,
		progress: state.recordings.progress,
		status: state.recordings.status,
		currentMediaId: state.recordings.currentMediaId,
		referencePath: state.recordings.referencePath,
	};
};

const mapDispatchToProps = {

};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(FloatingRecordingPanelContainer);

const RouterWrapper = ({ referencePath }) => (
	<Switch>
		<Route path={referencePath} component={NoMatch} />
		<Route component={Wrapped} />
	</Switch>
);

const mapStateToPropsRouter = (state) => ({
	referencePath: state.recordings.referencePath,
});

export default connect(mapStateToPropsRouter)(RouterWrapper);
