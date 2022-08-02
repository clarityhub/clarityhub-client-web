import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';

import { closeRightPane } from 'modules/app/store/actions';

import { getMedia } from '../store/actions';
import MediaDetails from '../components/MediaDetails';

const MediaViewContainer = ({ history, mediaId, isReady, error, media, closeRightPane, getMedia, ...props }) => {
	const load = useCallback(() => {
		getMedia(mediaId);
	}, [getMedia, mediaId]);

	useEffect(() => {
		if (!isReady) {
			load();
		}
	}, [isReady, load]);

	const onFullScreen = useCallback(() => {
		history.push(`/medias/${media.id}`);
		closeRightPane();
	}, [closeRightPane, history, media.id]);

	if (!isReady) {
		return <Loading />;
	}

	if (error) {
		return <Error error={error} />;
	}

	return (
		<MediaDetails
			{...props}
			onFullScreen={onFullScreen}
			media={media}
		/>
	);
};

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
	closeRightPane,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MediaViewContainer));
