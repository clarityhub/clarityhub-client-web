import React, { Fragment, useCallback, useRef, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { withRouter } from 'react-router-dom';
import Editor from 'modules/editor/containers/Editor';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import Card, { CardBody, CardActions } from '@clarityhub/unity-web/lib/components/Card';
import { LinkButton } from '@clarityhub/unity-web/lib/components/Link';
import { mdiMicrophone } from '@mdi/js';
import Icon from '@mdi/react';

import generateFileName from 'modules/recordings/utilities/generateFileName';
import OnboardingCard from 'modules/onboarding/containers/OnboardingCard';
import { Flag } from 'modules/app/components/Flags';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box/Box';
import isMobile from 'utilities/isMobile';

const SAVE_DELAY = 1000;


const UpgradeButton = withRouter(({ history, children }) => {
	return (
		<LinkButton text type="primary" size="small" history={history} to={'/settings/plans'}>
			{ children }
		</LinkButton>
	);
});

// TODO NotebookContent should have a container that provides
// the needed actions, rather than being passed all the way down
// from the ViewNotebook page component.
const NotebookContent = ({
	notebook,
	onChange,
	hideHighlights,
	createMedia,
	setTargetEditor,
	clearTargetEditor,
	workspaceStatus,

	modifyInterviewNotebooks,
}) => {
	const editorRef = useRef();
	const onChangeDebounced = useCallback(debounce(onChange, SAVE_DELAY), [onChange], { trailing: true });

	useEffect(() => {
		setTargetEditor(editorRef);

		return () => {
			clearTargetEditor();
		};
	}, [clearTargetEditor, setTargetEditor]);

	const modifyInterview = useCallback((interviewId, options = {}) => {
		return modifyInterviewNotebooks(options.action, interviewId, notebook.id);
	}, [modifyInterviewNotebooks, notebook.id]);

	const onSave = useCallback((state) => {
		// TODO don't send anything if nothing changed.
		// An onchange is sent when selections change

		onChangeDebounced(state);
	}, [onChangeDebounced]);

	const onCreateAudio = useCallback((onDismiss) => async () => {
		// This is a special version of the media item.
		const media = await createMedia({
			action: 'transcribe',
			status: 'recording',
			fileType: 'audio/wav',
			filename: generateFileName(),
		});

		editorRef.current.insertBlock({
			type: 'media',
			data: {
				id: media.id,
			},
		});

		onDismiss();
	}, [createMedia]);

	return (
		<Fragment>
			{
				!workspaceStatus && (
					<Box margin={{ bottom: 'medium' }}>
						<Card type="highlight" flat>
							<CardBody>
								<Typography noPadding noMargin>
									This workspace is in read-only mode and cannot be edited.
								</Typography>
								<Typography noPadding noMargin>
									To re-enable, please <UpgradeButton>upgrade</UpgradeButton> your subscription.
								</Typography>
							</CardBody>
						</Card>
					</Box>
				)
			}
			<Flag
				name={['platform', 'mobile']}
				render={() => (
					<Box margin={{ bottom: 'small' }}>
						<Card type="highlight" flat>
							<CardBody>
								<Typography>
									Notebooks are currently read-only on mobile.
									You can still record audio though.
								</Typography>
							</CardBody>
						</Card>
					</Box>
				)}
				fallback={() => (
					<OnboardingCard
						id="interview_editor_onboarding"
					>
						{({ onDismiss }) => (
							<Fragment>
								<Typography type="h3" noPadding noMargin>
									Enrich your interview notes
								</Typography>

								<Typography>
									Record your conversations with users and we'll automatically transcribe the recording for you.
								</Typography>

								<CardActions>
									<Button onClick={onCreateAudio(onDismiss)} icon={(
										<Icon path={mdiMicrophone}
											title="record"
											color="currentColor"
											size={0.7}
										/>)}>
										Add a Recording
									</Button>
								</CardActions>
							</Fragment>
						)}
					</OnboardingCard>
				)}
			/>
			<Editor
				ref={editorRef}
				notebookId={notebook.id}
				modifyInterview={modifyInterview}
				hideHighlights={hideHighlights}
				referencePath={`interview:${notebook.id}`}
				initialContent={notebook.content}
				placeholder="Start writing your notes..."
				onChange={onSave}
				readOnly={!workspaceStatus || isMobile.any()}
			/>
		</Fragment>
	);
};

export default NotebookContent;
