import React, { useCallback, useEffect, forwardRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import breakpoints from '@clarityhub/unity-web/lib/theme/breakpoints';
import Loading from '@clarityhub/unity-web/lib/components/Loading';

import { openRightPane } from 'modules/app/store/actions';
import { getMedia } from '../store/actions';
import MediaPanel from '../components/MediaPanel';

const MediaPanelContainer = forwardRef(({
	mediaId,
	referencePath,
	tagInfo,
	onUpdateMedia,
	mediaData,

	history,
	isReady,
	error,
	media,
	getMedia,
	openRightPane,

	...attributes
}, ref) => {
	const onViewMedia = useCallback(() => {
		// If mobile, history push instead
		const mobile = window.matchMedia(`(max-width: ${breakpoints.tablet})`);

		if (mobile && mobile.matches) {
			history.push(`/medias/${mediaId}`);
		} else {
			const when = {};
			const view = {
				type: 'media',
				id: mediaId,
			};
			openRightPane(when, view);

		}
	}, [history, mediaId, openRightPane]);

	const load = useCallback(() => {
		getMedia(mediaId);
	}, [getMedia, mediaId]);

	useEffect(() => {
		if (!isReady) {
			load();
		}
	}, [isReady, load]);

	let content = null;

	if (!isReady) {
		content = <Loading />;
	} else if (error) {
		content = <div>Error...</div>;
	} else {
		content = (
			<MediaPanel
				referencePath={referencePath}
				media={media}
				onViewMedia={onViewMedia}
				tagInfo={tagInfo}
				onUpdateMedia={onUpdateMedia}
				mediaData={mediaData}
			/>
		);
	}

	return (
		<div {...attributes} ref={ref}>
			{content}
		</div>
	);
});

const mapStateToProps = (state, props) => {
	const { mediaId } = props;

	const media = state.medias.items.find(item => item.id === mediaId);

	return {
		isReady: media,
		media,
		error: state.medias.error,
	};
};

const mapDispatchToProps = {
	getMedia,
	openRightPane,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
	forwardRef: true,
})(MediaPanelContainer));
