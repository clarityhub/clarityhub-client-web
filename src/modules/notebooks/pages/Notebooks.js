import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import Page from 'modules/app/layouts/Page';
import { mdiNotebookMultiple } from '@mdi/js';
import { getAll as getNotebooks, deleteNotebook } from '../store/actions';
import NotebookList from '../components/NotebookList';

const Notebooks = ({ getNotebooks, deleteNotebook, notebooks, error, hasLoadedAll }) => {
	const doSideEffects = useCallback(() => {
		if (!hasLoadedAll) {
			getNotebooks();
		}
	}, [getNotebooks, hasLoadedAll]);

	useEffect(() => {
		doSideEffects();
	}, [doSideEffects]);

	return (
		<Page
			icon={mdiNotebookMultiple}
			title="All Notebooks"
			crumbs={[
				{
					title: 'Home',
					path: '/',
				},
				{
					title: 'Notebooks',
				},
			]}
		>
			<NotebookList
				notebooks={notebooks}
				error={error}
				isReady={hasLoadedAll}
				onDelete={deleteNotebook}
			/>
		</Page>
	);
};

const mapStateToProps = (state) => {
	// Map tags to notebooks
	const notebooks = state.notebooks.items.map((notebook) => {
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
		hasLoadedAll: state.notebooks.hasLoadedAll,
		notebooks,
		error: state.notebooks.error,
	};
};

const mapDispatchToProps = {
	getNotebooks,
	deleteNotebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notebooks);
