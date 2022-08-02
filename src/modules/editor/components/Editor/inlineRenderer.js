import React from 'react';

import Link from '@clarityhub/unity-web/lib/components/Link';

import TagHighlight from './TagHighlight';

/**
 * Render a Slate mark.
 *
 * @param {Object} props
 * @return {Element}
 */
const inlineRenderer = ({ hideHighlights }) => (props, editor, next) => {
	const { attributes, children, node } = props;

	switch (node.type) {
	case 'tag': {
		const { data } = node;
		const color = data.get('color');
		const tagData = data.get('data');

		return (
			<TagHighlight
				color={color}
				tags={tagData.tags}
				children={children}
				hideHighlights={hideHighlights}
				{...attributes}
			/>
		);
	}
	case 'link': {
		const { data } = node;
		const href = data.get('href');
		return (
			<Link {...attributes} href={href}>
				{children}
			</Link>
		);
	}

	default: {
		return next();
	}
	}
};

export default inlineRenderer;
