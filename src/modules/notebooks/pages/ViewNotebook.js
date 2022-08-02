import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import { createMedia } from 'modules/medias/store/actions';
import { setTargetEditor, clearTargetEditor } from 'modules/editor/store/actions';
import Page from 'modules/app/layouts/Page';
import { modifyInterviewNotebooks } from 'modules/interviews/store/actions';

import { getNotebook, updateNotebook } from '../store/actions';
import NotebookBase from '../components/NotebookBase';

const ViewNotebook = ({
	match,
	error,
	isReady,
	notebook,
	getNotebook,
	createMedia,
	updateNotebook,
	modifyInterviewNotebooks,
	setTargetEditor,
	clearTargetEditor,
	workspaceStatus,
}) => {
	const contentRef = useRef();
	const { notebookId } = match.params;

	const doSideEffects = useCallback(async () => {
		await getNotebook(notebookId, {
			forceGet: false,
		});
	}, [getNotebook, notebookId]);

	const onChangeTitle = useCallback(async (title) => {
		await updateNotebook(notebookId, {
			title,
		});
	}, [notebookId, updateNotebook]);

	const onChangeContent = useCallback(async (content) => {
		const nextContent = JSON.stringify(content);

		if (nextContent !== contentRef.current) {
			contentRef.current = nextContent;
			await updateNotebook(notebookId, {
				content: nextContent,
			});
		}
	}, [notebookId, updateNotebook]);

	useEffect(() => {
		if (notebook) {
			contentRef.current = notebook.content;
		}
	}, [notebook]);

	useEffect(() => {
		if (!error) {
			doSideEffects();
		}
	}, [doSideEffects, error]);

	if (!isReady) {
		return <Loading flex size={2} />;
	}

	if (isReady && !notebook) {
		return (
			<Error error={'Notebook not found'} />
		);
	}

	if (error) {
		return (
			<Error error={error} />
		);
	}

	return (
		<Page
			title={notebook.title}
			crumbs={[
				{
					title: 'Home',
					path: '/',
				},
				{
					title: 'Notebooks',
					path: '/notebooks',
				},
				{
					title: notebook.title,
				},
			]}
			hideTitle
		>
			<NotebookBase
				modifyInterviewNotebooks={modifyInterviewNotebooks}
				onChangeTitle={onChangeTitle}
				onChangeContent={onChangeContent}
				setTargetEditor={setTargetEditor}
				clearTargetEditor={clearTargetEditor}
				notebook={notebook}
				createMedia={createMedia}
				workspaceStatus={workspaceStatus}
			/>
		</Page>
	);
};

const mapStateToProps = (state, props) => {
	const { notebookId } = props.match.params;

	return {
		notebook: state.notebooks.items.find(notebook => notebook.id === notebookId),
		isReady: state.notebooks.isReady,
		error: state.notebooks.error,
		workspaceStatus: state.session.accessTokenDecoded.workspaceStatus,
	};
};

const mapDispatchToProps = {
	getNotebook,
	updateNotebook,
	createMedia,
	setTargetEditor,
	clearTargetEditor,
	modifyInterviewNotebooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewNotebook);
