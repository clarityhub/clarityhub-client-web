import React from 'react';
import { connect } from 'react-redux';
import {
	mdiCommentQuoteOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import StyledButton from './StyledButton';

const getSelectionBlock = (editor) => {
	const { value } = editor;
	const { document, selection } = value;
	const { start } = selection;

	const block = document.getClosestBlock(start.key);

	return block;
};

export const isTranscriptSelected = (editor) => {
	const block = getSelectionBlock(editor);

	return block && block.type === 'transcript';
};

const TranscriptQuoteButton = ({ editor, target }) => {
	const isActive = target && target.current && isTranscriptSelected(editor);

	if (!isActive) {
		return null;
	}

	return (
		<StyledButton
			active={isActive}
			onMouseDown={event => {
				event.preventDefault();

				const block = getSelectionBlock(editor);

				target.current.insertBlock({
					type: block.type,
					data: block.data,

					nodes: [{
						'object': 'text',
						'text': editor.value.fragment.text,
						'marks': [],
					}],
				});

				editor.blur();
			}}
		>
			<Icon
				path={mdiCommentQuoteOutline}
				color="currentColor"
				title="Pull Recording Quote"
				size={0.8}
			/>
		</StyledButton>
	);
};

const mapStateToProps = (state) => {
	return {
		target: state.editor.target,
	};
};

export default connect(mapStateToProps)(TranscriptQuoteButton);
