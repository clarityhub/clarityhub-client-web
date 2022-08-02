import React from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import CenteredMessage from 'designsystem/CenteredMessage';

const FullPageLoader = ({ loading, error, render: Render }) => {
	if (error) {
		return (
			<Box>
				<CenteredMessage>
					<Error error={error} refresh />
				</CenteredMessage>
			</Box>
		);
	}

	if (loading) {
		return (
			<Loading flex size={2} />
		);
	}

	return <Render />;
};

export default FullPageLoader;
