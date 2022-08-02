import React, { Fragment, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import {
	mdiPlus,
	mdiMicrophone,
	mdiMinus,
	mdiImage,
	mdiAccountVoice,
} from '@mdi/js';
import Icon from '@mdi/react';
import breakpoints from '@clarityhub/unity-web/lib/theme/breakpoints';
import colors from '@clarityhub/unity-core/lib/colors';
import Button from '@clarityhub/unity-web/lib/components/Buttons';

import InterviewPickModalContainer from 'modules/interviews/containers/InterviewPickModalContainer';

import addRecording from './editorActions/addRecording';
import addImage from './editorActions/addImage';
import addInterview from './editorActions/addInterview';
import { DEFAULT_NODE, hasBlock } from './editorActions/utilities';

const MenuButtonWrapper = styled.div`
	background-color: white;
    padding: 8px 7px 6px;
    position: absolute;
    z-index: 1;
    top: -10000px;
    left: -10000px;
    margin-top: -6px;
    opacity: 0;
    transition: opacity 0.25s;

	@media(max-width: ${breakpoints.tablet}) {
		display: none;
	}
`;

const RibbonWrapper = styled.div`
	background-color: ${colors.muted.default};
    padding: 8px 7px 6px;
    position: fixed;
    z-index: 1;
    left: 0;
	right: 0;
	bottom: -10000px;
	width: 100%;
    opacity: 0;
    transition: opacity 0.25s;
	display: none;

	@media(max-width: ${breakpoints.tablet}) {
		display: block;
	}
`;

const RoundButton = styled.button`
    border: 1px solid #aaa;
    border-radius: 50%;
    background: transparent;
    color: #aaa;
    height: 1.9rem;
    text-align: center;
    width: 1.9rem;
    vertical-align: middle;
    padding: 0.3rem;
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
        border-color: #333;
        color: #333;
    }

    & + & {
        margin-left: 1rem;
    }
`;


const BlockButton = ({ editor, type, icon, toggleOpen, createMedia, sendMedia, onClick = () => {} }) => {
	let isActive = hasBlock(editor, type);

	return (
		<RoundButton
			active={isActive}
			onMouseDown={async event => {
				event.preventDefault();

				// TODO refactor with Recording Callout
				if (type === 'interview') {
					onClick();
				} else if (type === 'recording') {
					await addRecording({ createMedia, editor });
				} else if (type === 'picture') {
					await addImage({ createMedia, sendMedia, editor });
				} else {
					const isActive = hasBlock(editor, type);

					editor.setBlocks(isActive ? DEFAULT_NODE : type);

					editor.focus().moveToStartOfNextBlock();
				}

				toggleOpen();
			}}
		>
			<Icon
				path={icon}
				color={isActive ? 'white' : 'currentColor'}
				title={type}
				size={0.8}
			/>
		</RoundButton>
	);
};

const Actions = ({ editor, createMedia, sendMedia, toggleOpen, openInterviewPickModal }) => {
	return (
		<Fragment>
			<BlockButton
				onClick={openInterviewPickModal}
				editor={editor}
				toggleOpen={toggleOpen}
				type="interview"
				icon={mdiAccountVoice}
				createMedia={createMedia}
			/>
			<BlockButton
				editor={editor}
				toggleOpen={toggleOpen}
				type="recording"
				icon={mdiMicrophone}
				createMedia={createMedia}
			/>
			<BlockButton
				editor={editor}
				toggleOpen={toggleOpen}
				type="picture"
				icon={mdiImage}
				createMedia={createMedia}
				sendMedia={sendMedia}
			/>
			<BlockButton
				editor={editor}
				toggleOpen={toggleOpen}
				type="separator"
				icon={mdiMinus}
			/>
		</Fragment>
	);
};

const Menu = React.forwardRef(({ editor, createMedia, sendMedia, modifyInterview, ribbonRef }, ref) => {
	const [open, setOpen] = useState(false);
	const [interviewModal, setInterviewModal] = useState(false);

	const handleInterviewPickModal = useCallback(() => {
		setInterviewModal(true);
	}, []);

	const toggleOpen = useCallback(() => {
		setOpen(!open);
	}, [open]);

	return (
		<Fragment>
			<RibbonWrapper ref={ribbonRef}>
				{/* Ribbon is used by mobile */}
				<Button
					onClick={async (event) => {
						event.preventDefault();

						await addRecording({ createMedia, editor }, 'insertBlock');
					}}
				>
					<Icon
						path={mdiMicrophone}
						color="currentColor"
						title="Record"
						size={1}
						style={{ verticalAlign: 'inherit' }}
					/>
					{' '}
					Add Recording
				</Button>
			</RibbonWrapper>

			<MenuButtonWrapper ref={ref}>
				<RoundButton onClick={toggleOpen}>
					<Icon
						path={mdiPlus}
						color="currentColor"
						title={'Add Block'}
						size="1.1rem"
						rotate={open ? 45 : 0}
					/>
				</RoundButton>
				{
					open && (
						<Actions
							editor={editor}
							createMedia={createMedia}
							sendMedia={sendMedia}
							toggleOpen={toggleOpen}
							openInterviewPickModal={handleInterviewPickModal}
						/>
					)
				}
			</MenuButtonWrapper>

			{interviewModal && (
				<InterviewPickModalContainer
					open={Boolean(interviewModal)}
					onClose={() => setInterviewModal(false)}
					onPick={async (interview) => {
						await addInterview({ editor, interview });

						await modifyInterview(interview.id, {
							action: 'addNotebookToInterview',
						});
					}}
				/>
			)}
		</Fragment>
	);
});

const HoverSidebar = React.forwardRef(({ editor, createMedia, sendMedia, modifyInterview, ribbonRef }, ref) => {
	const root = window.document.body;

	return ReactDOM.createPortal(
		<Menu
			ref={ref}
			ribbonRef={ribbonRef}
			editor={editor}
			createMedia={createMedia}
			sendMedia={sendMedia}
			modifyInterview={modifyInterview}
		/>,
		root,
	);
});


export default HoverSidebar;
