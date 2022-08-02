import { useEffect } from 'react';
import { connect } from 'react-redux';

const BeforeLeave = ({ isRecording, progress }) => {
	useEffect(() => {
		if (isRecording || progress) {
			// add event listener
			window.onbeforeunload = function onbeforeunload() {
				return 'Are you sure you want to leave? You\'re recording will not be saved.';
			};
		}

		return () => {
			// remove event listener
			window.onbeforeunload = null;
		};
	}, [isRecording, progress]);

	return null;
};

const mapStateToProps = (state) => {
	return {
		isRecording: state.recordings.isRecording,
		progress: state.recordings.progress,
	};
};

export default connect(mapStateToProps)(BeforeLeave);
