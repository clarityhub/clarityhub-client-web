import defaultContent from 'modules/editor/components/Editor/defaultContent';

export default function createContentWithEmbed(node: Object): string {
	return JSON.stringify({
		...defaultContent,
		document: {
			...defaultContent.document,
			nodes: [
				node,
				...defaultContent.document.nodes,
			],
		},
	});
}
