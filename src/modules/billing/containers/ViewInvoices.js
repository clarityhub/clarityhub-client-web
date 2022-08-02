import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

import { getBillingInvoices } from '../store/actions';
import ViewInvoices from '../components/ViewInvoices';

const ViewInvoicesContainer = ({ getBillingInvoices, invoiceStatus, invoices, error }) => {
	useEffect(() => {
		if (invoiceStatus === 'pristine') {
			getBillingInvoices();
		}
	}, [getBillingInvoices, invoiceStatus]);

	if (invoiceStatus === 'pristine' || invoiceStatus === 'loading') {
		return <Loading flex size={2} />;
	}

	if (invoiceStatus === 'error') {
		return (
			<Error error={error} />
		);
	}

	return (
		<ViewInvoices invoices={invoices} />
	);
};

const mapStateToProps = (state) => ({
	invoiceStatus: state.billing.invoiceStatus,
	error: state.billing.error,
	invoices: state.billing.invoices,
});

const mapDispatchToProps = {
	getBillingInvoices,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewInvoicesContainer);
