import React, { useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';

import { updateMedia } from 'modules/medias/store/actions';

import TranscriptionEditor from '../components/TranscriptionEditor';

const SAVE_DELAY = 1000;

const TranscriptionEditorContainer = ({ media, updateMedia }) => {
	const valueRef = useRef(media.transcript);
	const updateMediaDebounced = useCallback(debounce(updateMedia, SAVE_DELAY), [updateMedia], { trailing: true });

	const onSave = useCallback((value) => {
		const nextValue = JSON.stringify(value);

		if (nextValue !== valueRef.current) {
			valueRef.current = nextValue;
			updateMediaDebounced(media.id, {
				transcript: nextValue,
			});
		}
	}, [media.id, updateMediaDebounced]);

	return (
		<TranscriptionEditor onChange={onSave} media={media} />
	);
};

const mapDispatchToProps = {
	updateMedia,
};

export default connect(null, mapDispatchToProps)(TranscriptionEditorContainer);
