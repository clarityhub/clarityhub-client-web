import React from 'react';
import Helmet from 'react-helmet';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import AppBreadcrumbs from 'modules/app/containers/AppBreadcrumbs';
import Content from 'modules/app/components/Content';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import LoadPayment from '../containers/LoadPayment';

const Payment = () => {
	return (
		<Box>
			<Helmet>
				<title>Workspace Plan – Clarity Hub</title>
			</Helmet>
			<AppBreadcrumbs
				includesInnerSidenav
				crumbs={[
					{
						title: 'Home',
						path: '/',
					},
					{
						title: 'Settings',
						path: '/settings',
					},
					{
						title: 'Payment',
					},
				]}
			/>

			<Content>
				<Typography type="h2" noPadding>
					Payment
				</Typography>
				<LoadPayment />
			</Content>
		</Box>
	);
};


export default Payment;
