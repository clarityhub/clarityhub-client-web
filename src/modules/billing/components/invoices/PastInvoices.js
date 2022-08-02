import React from 'react';
import { Accordion } from '@clarityhub/unity-web/lib/components/Accordion';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

import InvoiceItem from './InvoiceItem';

const UpcomingInvoice = ({ invoices }) => {
	if (!invoices || !invoices.data || invoices.data.length === 0) {
		return (
			<Typography>
                No past invoices
			</Typography>
		);
	}

	return (
		<Accordion>
			{invoices.data.map((invoice, key) => <InvoiceItem invoice={invoice} key={key} />)}
		</Accordion>
	);
};

export default UpcomingInvoice;
