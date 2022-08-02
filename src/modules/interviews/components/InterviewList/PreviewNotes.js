import React from 'react';
import styled from '@emotion/styled';
import { types } from '@clarityhub/unity-web/lib/theme/fonts';

const Styling = styled.pre`
	${types.text};

    color: #aaa;

	[data-slate-editor] > * + * {
		margin-top: 1rem;
	}
`;

const MAX_LENGTH = 50;

const getPreview = (text) => {
	return text.length > MAX_LENGTH ? text.slice(0, MAX_LENGTH) + '…' : text;
};

const PreviewNotes = ({ children }) => {
	if (!children) {
		return null;
	}

	return (
		<Styling>
			{getPreview(children)}
		</Styling>
	);
};

export default PreviewNotes;
