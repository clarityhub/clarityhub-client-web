import React from 'react';
import { Accordion } from '@clarityhub/unity-web/lib/components/Accordion';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import InvoiceItem from './InvoiceItem';

const UpcomingInvoice = ({ invoice }) => {
	if (invoice.error) {
		return (
			<Typography>
				{invoice.error}
			</Typography>
		);
	}

	return (
		<Accordion>
			<InvoiceItem invoice={invoice} />
		</Accordion>
	);
};

export default UpcomingInvoice;
