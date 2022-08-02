import { useEffect } from 'react';
import { connect } from 'react-redux';

import { connectPusher, closePusher } from '../store/actions';


const Pusher = ({ children, connectPusher, closePusher }) => {
	useEffect(() => {
		connectPusher();

		return () => closePusher();
	}, [closePusher, connectPusher]);

	return children;
};

const mapDispatchToProps = {
	connectPusher,
	closePusher,
};

export default connect(null, mapDispatchToProps)(Pusher);
