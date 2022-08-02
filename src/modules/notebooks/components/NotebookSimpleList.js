import React, { Fragment } from 'react';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

import NotebookItemRenderer from './NotebookList/NotebookItemRenderer';

const NotebooksSimpleList = ({ notebooks, error, isReady }) => {
	let content = null;

	if (error) {
		content = <Error error={error} />;
	} else if (!isReady) {
		content = <Loading flex size={2} />;
	} else {
		content = (
			<Fragment>
				{notebooks.map((notebook) => {
					return (
						<NotebookItemRenderer
							key={notebook.id}
							item={notebook}
						/>
					);
				})}

			</Fragment>
		);
	}

	return (
		<Fragment>
			{content}
		</Fragment>
	);
};

export default NotebooksSimpleList;
