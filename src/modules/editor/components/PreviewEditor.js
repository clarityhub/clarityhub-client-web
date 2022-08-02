import React from 'react';
import styled from '@emotion/styled';
import { types } from '@clarityhub/unity-web/lib/theme/fonts';
import { Editor as SlateEditor } from 'slate-react';
import { Value } from 'slate';

import markRenderer from './Editor/markRenderer';

const Styling = styled.div`
	${types.text};

    color: #aaa;

	[data-slate-editor] > * + * {
		margin-top: 1rem;
	}
`;

const getFirstParagraph = (content) => {
	// find the first item that is a paragraph

	let node = content.document.nodes.find(node => node.type === 'paragraph');

	if (!node) {
		node = {
			object: 'block',
			type: 'paragraph',
			data: {},
			nodes: [{
				object: 'text',
				text: '',
				marks: [],
			}],
		};
	}

	return {
		...content,
		document: {
			...content.document,
			nodes: [node],
		},
	};
};

const toJSON = (content) => {
	if (typeof content === 'string') {
		return JSON.parse(content);
	}
	return content;

};

const PreviewEditor = ({ content, ...props }) => {
	const firstParagraph = getFirstParagraph(toJSON(content));
	const value = Value.fromJSON(firstParagraph);

	return (
		<Styling>
			<SlateEditor
				value={value}
				renderMark={markRenderer}
				readOnly

				{...props}
			/>
		</Styling>
	);
};

export default PreviewEditor;
