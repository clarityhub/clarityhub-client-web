import React from 'react';
import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { AccordionItem, AccordionSummary, AccordionDetails } from '@clarityhub/unity-web/lib/components/Accordion';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { formatCurrency } from 'utilities/currency';

// TODO refactor with other intstances of toLocaleDateString
const formatDate = (date) => {
	return date.toLocaleDateString(undefined, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
};

const ExpandMoreIcon = () => (
	<Icon
		path={mdiChevronDown}
		title="Expand"
		size={1}
		style={{
			verticalAlign: 'middle',
		}}
	/>
);

const InvoiceItem = ({ invoice, ...props }) => {
	const issuedDate = formatDate(new Date(invoice.created * 1000));
	const status = invoice.status;
	const total = formatCurrency(invoice.total / 100);

	return (
		<AccordionItem {...props}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography
					inline
					noMargin
					noPadding
					type="text"
					style={{ marginRight: '30px' }}
				>
					<b>{issuedDate}</b>
				</Typography>
				<Typography inline noMargin noPadding type="text" style={{ float: 'right' }}>
					{status}
					{' '}
					{total}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box direction="column" margin={'small'}>
					<Box>
						<Typography type="text2" noMargin noPadding>
							<strong>
                                Invoice Date
							</strong>
						</Typography>
						<Typography type="text2" noMargin noPadding>
							{issuedDate}
						</Typography>
					</Box>


					<Box margin={{ top: 'small' }}>
						<Typography type="text2" noMargin noPadding>
							<strong>
								Payment
							</strong>
						</Typography>
						<Typography type="text2" noMargin noPadding>
							{status}
						</Typography>
					</Box>

					<Box margin={{ top: 'small' }}>
						<Typography type="text2" noMargin noPadding>
							<strong>
								Invoice ID
							</strong>
						</Typography>
						<Typography type="text2" noMargin noPadding>
							{invoice.id}
						</Typography>
					</Box>

					<Box margin={{ top: 'small' }}>
						<Typography type="text2" noMargin noPadding>
							<strong>
								Workspace Name
							</strong>
						</Typography>

						<Typography type="text2" noMargin noPadding>
							{invoice.account_name}
						</Typography>
					</Box>

					<Box margin={{ top: 'small' }}>
						<Typography type="text2" noMargin noPadding>
							<strong>
								To
							</strong>
						</Typography>
						<Typography type="text2" noMargin noPadding>
							{invoice.customer_email}
						</Typography>
					</Box>

					<Box margin={{ top: 'small' }}>
						<Typography type="text2" noMargin noPadding>
							<strong>
								Periodic Charges
							</strong>
						</Typography>
						<Typography type="text2" noMargin noPadding>
							Will incur every billing cycle unless adjustments are made.
						</Typography>
					</Box>


					{invoice.lines.data.map((line, i) => {
						const amount = formatCurrency(line.amount / 100);
						const start = formatDate(new Date(line.period.start * 1000));
						const end = formatDate(new Date(line.period.end * 1000));
						return (
							<Box margin={{ top: 'small', left: 'medium' }} key={i}>
								<Typography type="text2" noMargin noPadding>
									<strong>
										{start} - {end}
									</strong>
								</Typography>
								<Typography type="text2" noMargin noPadding>
									<span style={{ float: 'right' }}>
										{amount}
									</span>

									{line.description}
								</Typography>
							</Box>
						);
					})}
					{invoice.discount && (
						<Box margin={{ top: 'small', left: 'medium' }}>
							<Typography type="text2" noMargin noPadding>
								<strong>
									Discount
								</strong>
							</Typography>
							<Typography type="text2" noMargin noPadding>
								<span style={{ float: 'right' }}>
									{'-'}
									{(invoice.discount.coupon.amount_off ?
										formatCurrency(invoice.discount.coupon.amount_off / 100) :
										`${invoice.discount.coupon.percent_off}%`
									)}
								</span>
								{invoice.discount.coupon.name}
							</Typography>
						</Box>
					)}
					<Box margin={{ top: 'small' }}>
						<Typography type="text2" noMargin noPadding>
							<strong>
                                Summary
							</strong>
						</Typography>
						<Typography type="text2" noMargin noPadding>
							<span style={{ float: 'right' }}>
								{total}
							</span>

							Total
						</Typography>
					</Box>
				</Box>
			</AccordionDetails>
		</AccordionItem>
	);
};

export default InvoiceItem;
