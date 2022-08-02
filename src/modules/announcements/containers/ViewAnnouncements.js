import React from 'react';
import { number, string } from 'prop-types';
import LoaderContainer from 'designsystem/LoaderContainer';

import ViewAnnouncements from '../components/ViewAnnouncements';

const ViewAnnouncementsContainer = ({ numberOfPosts = 3, filterTag = 'announcements' }) => {
	return (
		<LoaderContainer
			onMount={() => {
				return fetch('https://stellar.clarityhub.io/feed.json', {
					mode: 'cors',
				}).then((response) => response.json())
					.then((response) => {
						const filteredItems = response.items.filter((item) => {
							if (item.tags) {
								return item.tags.some(tag => tag.toLowerCase() === filterTag);
							}
							return true;

						});

						return filteredItems.slice(0, numberOfPosts);
					});
			}}
		>
			{({ data }) => (
				<ViewAnnouncements
					posts={data}
				/>
			)}
		</LoaderContainer>
	);
};

ViewAnnouncementsContainer.propTypes = {
	filterTag: string,
	numberOfPosts: number,
};

export default ViewAnnouncementsContainer;
