import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import Page from 'modules/app/layouts/Page';

import { getAll as getIntegrations, getIntegrationsInfo } from '../store/actions';
import IntegrationList from '../components/IntegrationList';

const IntegrationsPage = ({ hasLoadedAll, getIntegrationsInfo, getIntegrations, info, integrations, error }) => {
	const doSideEffects = useCallback(() => {
		if (!hasLoadedAll) {
			getIntegrations();
			getIntegrationsInfo();
		}
	}, [getIntegrations, getIntegrationsInfo, hasLoadedAll]);

	useEffect(() => {
		doSideEffects();
	}, [doSideEffects]);

	return (
		<Page
			title="Integrations"
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
					title: 'Integrations',
				},
			]}
		>
			<IntegrationList
				integrations={integrations}
				info={info}
				error={error}
				isReady={hasLoadedAll}
			/>
		</Page>
	);
};

const mapStateToProps = (state) => {
	return {
		hasLoadedAll: state.integrations.hasLoadedAll,
		integrations: state.integrations.items,
		info: state.integrations.info,
		error: state.integrations.error,
	};
};

const mapDispatchToProps = {
	getIntegrations,
	getIntegrationsInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationsPage);
