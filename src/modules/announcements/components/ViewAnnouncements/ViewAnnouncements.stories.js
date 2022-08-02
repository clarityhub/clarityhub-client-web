import React from 'react';
import ViewAnnouncements from './ViewAnnouncements';

export default {
	title: 'Announcements/ViewAnnouncement',
	component: ViewAnnouncements,
};

export const Empty = () => {
	return (
		<ViewAnnouncements />
	);
};

export const WithPosts = () => {
	const posts = [{
		image: 'http://placehold.it/300x300',
		title: 'title1',
		summary: 'summary1',
		url: 'http://google.com',
	}, {
		image: 'http://placehold.it/300x300',
		title: 'title2',
		summary: 'summary2',
		url: 'http://google.com',
	}];

	return (
		<ViewAnnouncements posts={posts} />
	);
};
