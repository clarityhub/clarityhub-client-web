import React, { Fragment, useCallback, useState } from 'react';
import { JSONAPITable } from '@clarityhub/unity-web/lib/components/Table';
import Badge from '@clarityhub/unity-web/lib/components/Badge';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Button, { ButtonSet } from '@clarityhub/unity-web/lib/components/Buttons';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import {
	CardBody,
	CardActions,
} from '@clarityhub/unity-web/lib/components/Card';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import Toolbar from '@clarityhub/unity-web/lib/components/Toolbar';

// highlight current workspace

// Switch workspace
// don't let user switch to current workspace

const WorkspacesList = ({
	currentWorkspaceId,
	workspaces,
	createWorkspace,
	loginWorkspace,
	submitting,
}) => {
	const [workspaceName, setWorkspaceName] = useState('');
	const [showCreate, setShowCreate] = useState(false);
	const [error, setError] = useState(false);
	const onOpenCreate = useCallback(() => {
		setShowCreate(true);
	}, []);
	const onCloseCreate = useCallback(() => {
		setShowCreate(false);
	}, []);
	const onCreate = useCallback(async () => {
		try {
			setError(null);
			await createWorkspace({ name: workspaceName });

			setShowCreate(false);
		} catch (e) {
			setError(e);
		}
	}, [createWorkspace, workspaceName]);

	return (
		<Fragment>
			<Modal open={showCreate} onClose={onCloseCreate}>
				<CardBody>
					<Typography type="h3">Create a Workspace</Typography>

					{error && <Error error={error} />}

					<InputGroup>
						<LabelledInput
							type="text"
							name="workspace"
							label="Workspace Name"
							value={workspaceName}
							onChange={e => setWorkspaceName(e.target.value)}
						/>
					</InputGroup>

					<CardActions>
						<ButtonSet spread>
							<Button text onClick={onCloseCreate}>
                                Cancel
							</Button>
							<Button
								type="primary"
								onClick={onCreate}
								disabled={submitting}
							>
                                Create
							</Button>
						</ButtonSet>
					</CardActions>
				</CardBody>
			</Modal>


			<Toolbar>
				<Toolbar.Action>
					<Button
						size="small"
						type="primary"
						onClick={onOpenCreate}
					>
                        Create a Workspace
					</Button>
				</Toolbar.Action>

				{/* <ToolbarFilter /> */}
			</Toolbar>

			<JSONAPITable
				columns={[
					['Workspace Name', 'name'],
					['', (data) => {
						if (data.status === 'INVITED') {
							return (
								<Badge type="primary">Invited</Badge>
							);
						}
						return null;
					}],
					['Access Level', 'role'],
					['Actions', (data) => {
						if (data.id !== currentWorkspaceId) {
							return (
								<Button size="small" onClick={() => loginWorkspace(data.id)}>
                                    Switch Workspace
								</Button>
							);
						}
						return null;
					}],
				]}
				data={{
					data: workspaces,
				}}
			/>

		</Fragment>
	);
};

export default WorkspacesList;
