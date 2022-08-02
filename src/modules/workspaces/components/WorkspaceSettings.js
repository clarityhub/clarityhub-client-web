import React, { Fragment } from 'react';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { ButtonSet } from '@clarityhub/unity-web/lib/components/Buttons';

import DeleteWorkspace from './DeleteWorkspace';
import WorkspaceForm from './WorkspaceForm';

const WorkspaceSettings = ({
	workspace,
	onSubmit,
	isPatching,
	onDelete,
}) => {
	return (
		<Fragment>
			<WorkspaceForm
				formData={workspace}
				onSubmit={onSubmit}
				submitting={isPatching}
				submitText="Update Workspace"
			/>

			<Box>
				<Typography type="h3">Danger Zone</Typography>

				<ButtonSet>
					<DeleteWorkspace
						deleteWorkspace={onDelete}
					/>

				</ButtonSet>
			</Box>
		</Fragment>
	);
};


export default WorkspaceSettings;
