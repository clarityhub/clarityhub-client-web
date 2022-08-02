import React, { Fragment } from 'react';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import NotebookListContainer from 'modules/notebooks/containers/NotebookListContainer';

/**
 * Show the related notebooks for a given interview
 */
const InterviewNotebooksContainer = ({ interview }) => {
	const { notebookIds } = interview;

	if (!notebookIds || notebookIds.length === 0) {
		return null;
	}

	return (
		<Fragment>
			<Typography type="h3">
                Related Notebooks
			</Typography>
			<NotebookListContainer
				notebookIds={interview.notebookIds}
			/>
		</Fragment>
	);
};

export default InterviewNotebooksContainer;
