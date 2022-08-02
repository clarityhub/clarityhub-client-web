import React from 'react';

import Box from '@clarityhub/unity-web/lib/scaffolding/Box';

import Typography from '@clarityhub/unity-web/lib/components/Typography';
import UpcomingInvoice from './invoices/UpcomingInvoice';
import PastInvoices from './invoices/PastInvoices';

const ViewInvoices = ({ invoices }) => {
	return (
		<Box>
			<Typography type="text2">
				<strong>
					Upcoming Invoices
				</strong>
			</Typography>
			<UpcomingInvoice invoice={invoices.upcomingInvoice} />

			<Typography type="text2">
				<strong>
					Past Invoices
				</strong>
			</Typography>
			<PastInvoices invoices={invoices.invoices} />
		</Box>
	);
};

export default ViewInvoices;
