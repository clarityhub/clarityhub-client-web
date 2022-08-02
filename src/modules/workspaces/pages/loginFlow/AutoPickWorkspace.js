import React, { useEffect } from 'react';

import FullPageLoader from 'modules/app/layouts/FullPageLoader';
import PickWorkspaceContainer from '../../containers/PickWorkspace';

const AutoPickHelper = ({ workspace, onPick, error }) => {
	useEffect(() => {
		onPick(workspace.id);
	}, [onPick, workspace.id]);

	return <FullPageLoader error={error} loading />;
};

const AutoPickWorkspaceLoginFlow = ({ workspace }) => {
	return (
		<PickWorkspaceContainer>
			{({ onPick, error }) => {
				return <AutoPickHelper workspace={workspace} error={error} onPick={onPick} />;
			}}
		</PickWorkspaceContainer>
	);
};

export default AutoPickWorkspaceLoginFlow;
