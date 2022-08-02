import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import NotebookSimpleList from '../components/NotebookSimpleList';

import { getNotebook } from '../store/actions';

/**
 * Show a list of notebooks by passing in many notebookIds
 */
const NotebookListContainer = ({ getNotebook, notebookIds, notebooks, error, isReady }) => {
	const doSideEffects = useCallback(async () => {
		await Promise.all(notebookIds.map((notebookId) => {
			return getNotebook(notebookId, {
				forceGet: false,
				allow404: true,
			});
		}));
	}, [getNotebook, notebookIds]);

	useEffect(() => {
		if (!error) {
			doSideEffects();
		}
	}, [doSideEffects, error]);

	return (
		<NotebookSimpleList
			notebooks={notebooks}
			error={error}
			isReady={isReady}
		/>
	);
};

const mapStateToProps = (state, props) => {
	const notebooks = state.notebooks.items
		.filter(notebook => props.notebookIds.includes(notebook.id))
		.map((notebook) => {
			// TODO refactor tag mapping with other instances of the same code
			const mapping = state.tags.tagItems.items[`interview:${notebook.id}`];

			const meta = {
				tags: (mapping && mapping.items.map((tagItem) => {
					return state.tags.tags.items.find(tag => tag.tagPath === tagItem.tagPath);
				}).filter(Boolean)) || [],
			};

			return {
				...notebook,
				meta,
			};
		});

	return {
		notebooks,
		isReady: state.notebooks.isReady,
		error: state.notebooks.error,
	};
};

const mapDispatchToProps = {
	getNotebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotebookListContainer);
