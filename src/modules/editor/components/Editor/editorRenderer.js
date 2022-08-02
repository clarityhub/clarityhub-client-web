import React from 'react';

import DragAndDrop from './DragAndDrop';
import HoverMenu from './HoverMenu';
import HoverSidebar from './HoverSidebar';

const editorRenderer = ({
	ribbonRef,
	menuRef,
	sidenavRef,
	createMedia,
	disableSidebar,
	minimalActions,
	sendMedia,
	referencePath,
	modifyInterview,

	hoverMenuTimestamp,
}) => (props, editor, next) => {
	const children = next();
	return (
		<DragAndDrop editor={editor} createMedia={createMedia} sendMedia={sendMedia}>
			{children}
			<HoverMenu
				ref={menuRef}
				editor={editor}
				minimalActions={minimalActions}
				hoverMenuTimestamp={hoverMenuTimestamp}
				referencePath={referencePath}
			/>
			{!disableSidebar && (
				<HoverSidebar
					ref={sidenavRef}
					ribbonRef={ribbonRef}
					editor={editor}
					createMedia={createMedia}
					sendMedia={sendMedia}
					modifyInterview={modifyInterview}
				/>
			)}
		</DragAndDrop>
	);
};

export default editorRenderer;
