/** @jsx jsx */
import { Fragment, useState } from 'react';
import { jsx, css } from '@emotion/core';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import breakpoints from '@clarityhub/unity-web/lib/theme/breakpoints';
import Card, {
	CardBody,
} from '@clarityhub/unity-web/lib/components/Card';
import {
	mdiTag,
	mdiDotsVertical,
} from '@mdi/js';
import Icon from '@mdi/react';
import { Menu, MenuItem } from '@clarityhub/unity-web/lib/components/Menu';
import Button from '@clarityhub/unity-web/lib/components/Button';

import TagEditor from 'modules/tags/containers/TagEditor';
import TranscriptionBadge from './TranscriptionBadge';

const AudioPanel = ({ media, onViewMedia, tagInfo }) => {
	const [tagging, setTagging] = useState(false);

	return (
		<Card>
			<CardBody>
				<Box
					flex={1}
					direction="row"
					gap="small"
					css={css`
						align-items: center;

						@media(max-width: ${breakpoints.tablet}) {
							flex-direction: column;
							align-items: right;
						}
					`}
				>
					<Box flex={1} css={css`
						@media(max-width: ${breakpoints.tablet}) {
							width: 100%;
						}
					`}>
						<audio controls height="100" width="100%" crossOrigin="cross-origin" style={{ width: '100%' }}>
							<source src={media.presignedUrl} type={media.fileType} />
							<embed height="50" width="100%" src={media.presignedUrl} />
						</audio>
					</Box>

					<Box css={css`
					 	width: 12rem;

						@media(max-width: ${breakpoints.tablet}) {
							margin-top: 1rem;
							width: 100%;
						}
					`}>
						<TranscriptionBadge
							transcriptionStatus={media.transcriptionStatus}
							transcriptionError={media.transcriptionError}
							onViewMedia={onViewMedia}
						/>
					</Box>

					<Menu
						onClose={() => setTagging(false)}
						content={
							tagging ? (
								<TagEditor
									activeTags={tagInfo.activeTags}
									onAddTag={tagInfo.onAdd}
									onRemoveTag={tagInfo.onRemove}
								/>
							) : (
								<Fragment>
									<MenuItem
										style={{
											verticalAlign: 'middle',
										}}
										onClick={() => setTagging(true)}
									>
										<Icon
											path={mdiTag}
											title="Tag"
											color="currentColor"
											size={1}
											style={{ verticalAlign: 'middle' }}
										/>
										{' '}
											Tag
									</MenuItem>
								</Fragment>
							)
						}
					>
						{({ open }) => (
							<Button text onClick={open}>
								<Icon
									path={mdiDotsVertical}
									color="currentColor"
									title={'Open options'}
									size="1.1rem"
								/>
							</Button>
						)}
					</Menu>
				</Box>
			</CardBody>
		</Card>
	);
};

export default AudioPanel;
