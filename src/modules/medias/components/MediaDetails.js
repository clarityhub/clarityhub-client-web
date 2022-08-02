import React from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import {
	mdiPagePreviousOutline,
} from '@mdi/js';
import Icon from '@mdi/react';

import TranscriptionEditor from '../containers/TranscriptionEditor';

const MediaDetails = ({ media, onFullScreen, isInSidenav }) => {
	if (media.transcript) {
		return (
			<Box>
				{isInSidenav && (
					<Box margin={{ bottom: 'small' }} style={{ textAlign: 'right' }}>
						<div>
							<Button
								size="small"
								onClick={onFullScreen}
							>
								<Icon
									path={mdiPagePreviousOutline}
									color="currentColor"
									title={'Open as Page'}
									style={{ verticalAlign: 'text-top' }}
									size="1rem"
								/>
								{' '}
								Open as Page
							</Button>
						</div>
					</Box>
				)}

				<TranscriptionEditor media={media} />
			</Box>
		);
	}

	return (
		<div>Media Item {JSON.stringify(media)}</div>
	);
};

export default MediaDetails;
