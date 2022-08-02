import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Toggle from '@clarityhub/unity-web/lib/components/Toggle';
import Menu from '@clarityhub/unity-web/lib/components/Menu/Menu';
import Button from '@clarityhub/unity-web/lib/components/Button';
import {
	mdiDotsVertical,
} from '@mdi/js';
import Icon from '@mdi/react';

import { Flag } from 'modules/app/components/Flags';
import TagList from 'modules/tags/containers/TagList';

import NotebookHeading from './NotebookHeading';
import NotebookContent from './NotebookContent';

const MenuWrapper = styled.div`
	width: 2rem;
`;

const NotebookBase = ({
	notebook,
	createMedia,
	onChangeTitle,
	onChangeContent,
	setTargetEditor,
	clearTargetEditor,
	workspaceStatus,
	modifyInterviewNotebooks,
}) => {
	const [hideHighlights, setHideHighlights] = useState(false);

	return (
		<Fragment>
			<Box direction="row">
				<Box flex={1}>
					<NotebookHeading
						onChange={onChangeTitle}
						title={notebook.title}
					/>
				</Box>

				<Flag
					name={['features', 'editorTags']}
					render={() => (
						<MenuWrapper>
							<Menu
								content={
									<Box margin="small">
										<Toggle
											labelRight="Hide Highlights"
											checked={hideHighlights}
											onClick={() => setHideHighlights(prevValue => !prevValue)}
											center
										/>
									</Box>
								}
							>
								{({ open }) => (
									<Button text onClick={open}>
										<Icon
											path={mdiDotsVertical}
											color="currentColor"
											title={'Open options'}
											size="1.1rem"
										/>
									</Button>
								)}
							</Menu>
						</MenuWrapper>
					)}
				/>
			</Box>

			<TagList
				itemId={notebook.id}
				itemType="interview"
				itemPreview={notebook.title}
			/>

			<Box margin={{ top: 'small', bottom: 'large' }}>
				<NotebookContent
					hideHighlights={hideHighlights}
					notebook={notebook}
					createMedia={createMedia}
					onChange={onChangeContent}
					setTargetEditor={setTargetEditor}
					clearTargetEditor={clearTargetEditor}
					workspaceStatus={workspaceStatus}
					modifyInterviewNotebooks={modifyInterviewNotebooks}
				/>
			</Box>
		</Fragment>
	);
};

export default NotebookBase;
