import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { LinkButton } from '@clarityhub/unity-web/lib/components/Link';
// import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';
// import { mdiMagnify } from '@mdi/js';
// import Icon from '@mdi/react';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import { Cards } from 'designsystem/CardFilterList';
import Card, { CardFooter, CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Typography from '@clarityhub/unity-web/lib/components/Typography';

const IntegrationList = ({ history, info, integrations, error, isReady }) => {
	let content = null;

	if (error) {
		content = <Error error={error} />;
	} else if (!isReady) {
		content = <Loading flex size={2} />;
	} else {
		const filteredInfo = info.filter(i => {
			return !integrations.some(integration => {
				return integration.integrationKey === i.integrationKey;
			});
		});

		content = (
			<Fragment>
				{/* <LabelledInput
                    prefixIcon={
                        <Icon
                            path={mdiMagnify}
                            title="Search"
                            color="currentColor"
                            size={1}
                        />
                    }
                    autoComplete="off"
                    label="Find an integration"
                    // onChange={onChange}
                    // value={search}
                /> */}

				<Cards items={integrations} empty={() => null}>
					{({ item }) => {
						return (
							<Card key={item.integrationKey}>
								<CardBody>
									<Box direction="row">
										<Box margin={{ right: 'small' }}>
											<img style={{ width: '80px' }} src={`/integration-icons/${item.appName.toLowerCase()}.svg`} alt={item.appName} />
										</Box>
										<Box>
											<Typography type="h2" noMargin noPadding>
												{item.appName}
											</Typography>
											<Typography>
												{item.description}
											</Typography>
										</Box>
									</Box>
								</CardBody>
								<CardFooter>
									<LinkButton
										history={history}
										block
										type="primary"
										outline
										to={`/settings/integrations/edit/${item.integrationKey}`}
									>
										Edit
									</LinkButton>
								</CardFooter>
							</Card>
						);
					}}
				</Cards>

				<Cards items={filteredInfo}>
					{({ item }) => {
						return (
							<Card key={item.integrationKey}>
								<CardBody>
									<Box direction="row">
										<Box margin={{ right: 'small' }}>
											<img style={{ width: '80px' }} src={`/integration-icons/${item.appName.toLowerCase()}.svg`} alt={item.appName} />
										</Box>
										<Box>
											<Typography type="h2" noMargin noPadding>
												{item.appName}
											</Typography>
											<Typography>
												{item.description}
											</Typography>
										</Box>
									</Box>
								</CardBody>
								<CardFooter>
									<LinkButton
										history={history}
										block
										type="primary"
										outline
										to={`/settings/integrations/${item.appName.toLowerCase()}?integrationKey=${item.integrationKey}`}
									>
										Add
									</LinkButton>
								</CardFooter>
							</Card>
						);
					}}
				</Cards>
			</Fragment>
		);
	}

	return (
		<Box>
			{content}
		</Box>
	);
};

export default withRouter(IntegrationList);
