import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

function sendPageView(location) {
	ReactGA.set({ page: location.pathname });
	ReactGA.pageview(location.pathname);
}

function GAListener({ children, trackingId, history }) {
	useEffect(() => {
		ReactGA.initialize(trackingId);
		sendPageView(history.location);
		return history.listen(sendPageView);
	}, [history, history.location, trackingId]);

	return children;
}

GAListener.propTypes = {
	children: PropTypes.node,
	history: PropTypes.shape({
		listen: PropTypes.func,
	}),
	trackingId: PropTypes.string,
};

export default withRouter(GAListener);
