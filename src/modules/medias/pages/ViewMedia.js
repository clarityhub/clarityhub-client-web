import React from 'react';
import Page from 'modules/app/layouts/Page';

import MediaView from '../containers/MediaView';

const ViewMedia = ({ match }) => {
	const { mediaId } = match.params;

	return (
		<Page
			goBack
			title="Media"
			crumbs={[
				{
					title: 'Home',
					path: '/',
				},
				{
					title: 'Media',
				},
			]}
		>
			<MediaView mediaId={mediaId} />
		</Page>
	);
};

export default ViewMedia;
