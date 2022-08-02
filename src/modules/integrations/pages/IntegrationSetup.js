import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import Page from 'modules/app/layouts/Page';
import Loading from '@clarityhub/unity-web/lib/components/Loading';

import { getIntegrationsInfo, create as createIntegration } from '../store/actions';
import activations from '../components/activation';

const getCurrentIntegrationKey = (location) => {
	const params = new URLSearchParams(location.search);

	const state = params.get('state');
	const integrationKey = params.get('integrationKey');

	if (state) {
		try {
			const s = JSON.parse(state);

			if (s.integrationKey) {
				return s.integrationKey;
			}
		} catch (e) {
			// Do nothing
		}
	} else if (integrationKey) {
		return integrationKey;
	}

	return '';
};

const IntegrationSetupPage = ({ info, isCreating, location, getIntegrationsInfo, createIntegration }) => {
	const doSideEffects = useCallback(() => {
		getIntegrationsInfo();
	}, [getIntegrationsInfo]);

	useEffect(() => {
		doSideEffects();
	}, [doSideEffects]);

	const integrationKey = getCurrentIntegrationKey(location);

	const mapped = activations[integrationKey.toLowerCase()];
	let Component = mapped;

	if (!mapped) {
		Component = () => (
			<div>
                Unknown integration selected
			</div>
		);
	}

	if (!info) {
		Component = () => <Loading flex size={2} />;
	}

	const integration = info.find((i) => i.integrationKey === integrationKey);

	if (!integration) {
		Component = () => <Loading flex size={2} />;
	}

	return (
		<Page
			title="Setup Integration"
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
					path: '/settings/integrations',
				},
				{
					title: 'Setup Integration',
				},
			]}
		>
			<Component
				isSubmitting={isCreating}
				integrationKey={integrationKey}
				infoIntegration={integration}
				location={location}
				onSubmit={createIntegration}
			/>
		</Page>
	);
};

const mapStateToProps = (state) => {
	return {
		info: state.integrations.info,
		isCreating: state.integrations.isCreating,
	};
};

const mapDispatchToProps = {
	getIntegrationsInfo,
	createIntegration,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationSetupPage);
