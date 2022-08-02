import React from 'react';
import { FlexGridContainer, FlexGrid, FlexColumn } from '@clarityhub/unity-web/lib/scaffolding/FlexGrid';
import Typography from '@clarityhub/unity-web/lib/components/Typography/Typography';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import capitalize from 'utilities/capitalize';

const keyLabels = {
	line1: 'Address 1',
	line2: 'Address 2',
	postal_code: 'Postal Code',
	billingEmail: 'Billing Email',
};

const BillingAddress = ({ address: { hasData, ...address } }) => {
	return (
		<Box margin={{ top: 'small' }}>
			<FlexGridContainer style={{ padding: 0 }}>
				{
					Object.entries(address)
						.map(([key, value]) => (
							<FlexGrid gap="small" key={key}>
								<FlexColumn>
									<Typography type="text2">
										<strong>
											{keyLabels[key] || capitalize(key)}
										</strong>
									</Typography>
								</FlexColumn>
								<FlexColumn style={{ flex: '2' }}>
									<Typography type="text2">
										{value}
									</Typography>
								</FlexColumn>
							</FlexGrid>
						))
				}
			</FlexGridContainer>
		</Box>
	);
};

export default BillingAddress;
