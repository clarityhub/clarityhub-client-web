import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import { getBilling } from '../store/actions';
import PaymentContainer from './PaymentContainer';

const LoadPayment = ({ getBilling, billing }) => {
	useEffect(() => {
		getBilling();
	}, [getBilling]);

	if (billing.status === 'loading' || billing.status === 'pristine') {
		return (
			<Loading flex size={2} />
		);
	}

	if (billing.status === 'failed') {
		return <Notification type="danger">Unable to load payment infomation</Notification>;
	}

	return (
		<PaymentContainer billing={billing} />
	);
};

const mapStateToProps = (state) => ({
	billing: state.billing,
});

const mapDispatchToProps = {
	getBilling,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LoadPayment);
