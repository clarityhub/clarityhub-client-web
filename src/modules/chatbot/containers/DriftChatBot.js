import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	showDrift,
	hideDrift,
} from '../store/actions';

const DriftChatBotContainer = ({ showDrift, hideDrift }) => {
	useEffect(() => {
		showDrift();

		return () => {
			hideDrift();
		};
	});

	return null;
};

const mapDispatchToProps = {
	showDrift,
	hideDrift,
};

export default connect(null, mapDispatchToProps)(DriftChatBotContainer);
