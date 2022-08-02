import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import Page from 'modules/app/layouts/Page';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

import {
	getIntegrationsInfo,
	get as getIntegration,
	update as updateIntegration,
	test as testIntegration,
	del as deleteIntegration,
} from '../store/actions';
import activations from '../components/activation';


const IntegrationSetupPage = ({
	match,
	getIntegrationsInfo,
	getIntegration,
	updateIntegration,
	testIntegration,
	deleteIntegration,
	isReady,
	isTesting,
	integration,
	info,
	error,
	isPatching,
	testResult,
}) => {
	const integrationKey = match.params.integrationKey;

	const doSideEffects = useCallback(() => {
		getIntegrationsInfo();
		getIntegration(integrationKey);
	}, [getIntegration, getIntegrationsInfo, integrationKey]);

	useEffect(() => {
		doSideEffects();
	}, [doSideEffects]);

	const mapped = activations[integrationKey.toLowerCase()];
	let Component = mapped;

	if (error) {
		Component = () => <Error error={error} />;
	}

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

	const infoIntegration = info.find((i) => i.integrationKey === integrationKey);

	if (!integration || !infoIntegration) {
		Component = () => <Loading flex size={2} />;
	}

	return (
		<Page
			title="Edit Integration"
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
					title: 'Edit Integration',
				},
			]}
		>
			<Component
				isSubmitting={isPatching}
				integrationKey={integrationKey}
				integration={integration}
				infoIntegration={infoIntegration}
				onSubmit={(payload)=> updateIntegration(integrationKey, payload)}

				isEditting
				isTesting={isTesting}
				onTest={(payload) => testIntegration(integrationKey, payload)}
				onDelete={() => deleteIntegration(integrationKey)}
			/>
		</Page>
	);
};

const mapStateToProps = (state, props) => {
	const { inttegrationKey } = props.match.params;
	return {
		isReady: state.integrations.isReady,
		integration: state.integrations.items.find((i) => i.inttegrationKey === inttegrationKey),
		info: state.integrations.info,
		error: state.integrations.error,
		isPatching: state.integrations.isPatching,
		isTesting: state.integrations.isTesting,
		testResult: state.integrations.testResult,
	};
};

const mapDispatchToProps = {
	getIntegrationsInfo,
	getIntegration,
	updateIntegration,
	testIntegration,
	deleteIntegration,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationSetupPage);
