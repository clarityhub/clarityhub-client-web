import React, { Suspense, forwardRef } from 'react';
import { connect } from 'react-redux';
import Loading from '@clarityhub/unity-web/lib/components/Loading';

import { createMedia, sendMedia } from 'modules/medias/store/actions';
import { deleteTagItem } from 'modules/tags/store/actions';

const Editor = React.lazy(() => import('../components/Editor/index'));

const EditorContainer = forwardRef(({ ...props }, ref) => {
	// TODO error boundary
	return (
		<Suspense fallback={
			<Loading flex size={2} />
		}>
			<Editor {...props} ref={ref} />
		</Suspense>
	);
});

const mapDispatchToProps = {
	createMedia,
	sendMedia,

	deleteTagItem,
};

export default connect(null, mapDispatchToProps, null, {
	forwardRef: true,
})(EditorContainer);
