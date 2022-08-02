import React from 'react';
import Icon from '@mdi/react';
import StyledButton from './StyledButton';

const MarkButton = ({ editor, fullWidth, showText, type, readable, icon }) => {
	const { value } = editor;
	const isActive = value.activeMarks.some(mark => mark.type === type);
	return (
		<StyledButton
			fullWidth={fullWidth}
			active={isActive}
			onMouseDown={event => {
				event.preventDefault();
				editor.toggleMark(type);
			}}
		>
			<Icon
				path={icon}
				color="currentColor"
				title={type}
				size={0.8}
			/>

			{showText && ' ' + readable}
		</StyledButton>
	);
};

export default MarkButton;
