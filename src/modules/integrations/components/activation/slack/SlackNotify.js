import React, { Fragment, useState, useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import Typography from '@clarityhub/unity-web/lib/components/Typography/Typography';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import ToastManager from '@clarityhub/unity-web/lib/contexts/ToastManager';

import AddToSlackButton from './AddToSlackButton';
import configSchema from './configSchema';

const getCode = (location) => {
	if (!location) {
		return null;
	}
	const params = new URLSearchParams(location.search);

	const code = params.get('code');

	return code;
};

const SlackNotify = ({
	infoIntegration,
	integrationKey,
	location,
	onSubmit,
	isSubmitting,
	integration,
	isEditting,
	isTesting,
	onDelete,
	onTest,
	history,
}) => {
	const defaultFormData = {};
	if (integration) {
		defaultFormData.channel = integration.config.channel;
		defaultFormData.name = integration.name;
		defaultFormData.description = integration.description;
	}
	const [tempData, setTempData] = useState(defaultFormData);
	const { createToast } = useContext(ToastManager);
	const [error, setError] = useState(null);
	const [redirectTo, setRedirectTo] = useState();

	const code = getCode(location);
	const isSettingUp = !code && !integration;
	const redirectUrl = `${process.env.REACT_APP_APP_BASE}/settings/integrations/${infoIntegration.appName.toLowerCase()}`;

	const handleCreate = async (values) => {
		try {
			const integrationKey = `${infoIntegration.appName}:${infoIntegration.action}`;
			const result = await onSubmit({
			    appName: infoIntegration.appName,
			    action: infoIntegration.action,
			    title: values.title,
			    description: values.description,
			    config: {
			        channel: values.channel,
			    },
				code,
				redirectUrl,
			});

			if (result && (result.status < 200 || result.status > 299)) {
				setError(result);
				return;
			}

			createToast({
				dedupId: 'created-integration',
				message: `Successfully ${isEditting ? 'updated' : 'created'} the integration`,
				type: 'success',
			});

			setRedirectTo(`/settings/integrations/edit/${integrationKey}`);
		} catch (e) {
			setError(e);
		}
	};

	const handleTest = async () => {
		try {
			const { channel, ...data } = tempData;
			const result = await onTest({
				...data,
				config: {
					channel,
				},
			});

			if (result && (result.status < 200 || result.status > 299)) {
				setError(result);
			} else if (result) {
				createToast({
					dedupId: 'test-integration',
					message: 'Successfully tested the integration',
					type: 'success',
				});
			}
		} catch (e) {
			setError(e);
		}
	};

	const handleDelete = async () => {
		try {
			const result = await onDelete();

			if (result && (result.status < 200 || result.status > 299)) {
				setError(result);
			} else if (result && result) {
				createToast({
					dedupId: 'delete-integration',
					message: 'Integration deleted',
					type: 'success',
				});
				// Can't use setRedirectTo here
				history.push('/settings/integrations');
			}
		} catch (e) {
			setError(e);
		}
	};

	if (redirectTo) {
		return (
			<Redirect to={redirectTo} />
		);
	}

	return (
		<Box>
			<Box>
				<Typography type="h2" noMargin noPadding>
                    Step 1
				</Typography>

				<Typography>
                    Add Clarity Hub to your Slack Workspace
				</Typography>

				<AddToSlackButton
					redirectUrl={redirectUrl}
					state={{
						integrationKey,
					}}
					disabled={!isSettingUp}
				/>
			</Box>

			<Box margin={{ top: 'medium' }}>

				<Typography type="h2" noMargin noPadding>
                    Step 2
				</Typography>

				<Typography>
                    Configure your integration
				</Typography>

				{error &&
					<Error error={error} />
				}

				{
					!isSettingUp && (
						<FormFromSchema
							submitting={isSubmitting}
							hideTitle
							formData={tempData}
							onSubmit={handleCreate}
							schema={configSchema}
							submitText={isEditting ? 'Edit': 'Create'}
							onChange={(data) => setTempData(data.formData)}

							additionalButtons={() => (
								<Fragment>
									{onTest &&
										<Button loading={isTesting} disabled={isTesting} onClick={handleTest}>Test</Button>
									}
								</Fragment>
							)}
						/>
					)
				}
			</Box>

			{onDelete && (
				<Box margin={{ top: 'medium' }}>
					<Typography type="h2" noMargin noPadding>
						Danger Zone
					</Typography>

					<Box margin={{ top: 'small' }}>
						<div>
							<Button type="danger" onClick={handleDelete}>Delete Integration</Button>
						</div>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default withRouter(SlackNotify);
