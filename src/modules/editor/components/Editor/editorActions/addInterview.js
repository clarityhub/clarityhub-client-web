export default function addInterview({ interview, editor }, action = 'setBlocks') {
	editor[action]({
		type: 'interview',
		data: {
			id: interview.id,
		},
	});

	editor.focus().moveToStartOfNextBlock();
}
