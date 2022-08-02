import React, { Fragment, useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { ResizableBox } from 'react-resizable';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { Menu, MenuItem } from '@clarityhub/unity-web/lib/components/Menu';
import Button from '@clarityhub/unity-web/lib/components/Button';
import {
	mdiTag,
	mdiDownload,
	mdiDotsVertical,
} from '@mdi/js';
import Icon from '@mdi/react';
import Image from '@clarityhub/unity-web/lib/components/Image';

import TagEditor from 'modules/tags/containers/TagEditor';
import FloatingHoverButton from 'designsystem/FloatingHoverButton';

const Img = styled.div`
	height: 100%;
    max-width: 100%;
	margin: auto;

	img {
		height: 100%;
	}


	.react-resizable {
		position: relative;
	}
	.react-resizable-handle {
		position: absolute;
		width: 20px;
		height: 80px;
		background-repeat: no-repeat;
		background-origin: content-box;
		box-sizing: border-box;
		background-position: bottom right;
		padding: 0 3px 3px 0;
	}

	.react-resizable:hover {
		& .react-resizable-handle-e {
			border-right: 2px solid #d4d4d4;
		}
	}

	.react-resizable-handle-e {
		top: 50%;
		cursor: ew-resize;
	}
	
	.react-resizable-handle-e {
		right: -8px;
		transform: translateY(-50%);
	}
`;

const ImagePanel = ({ media, mediaData = {}, tagInfo, onUpdateMedia }) => {
	const [active, setActive] = useState(false);
	const [tagging, setTagging] = useState(false);
	const popover = useRef(null);

	const handleResize = useCallback((e, data) => {
		onUpdateMedia({
			type: 'media',
			data: {
				id: media.id,
				size: data.size,
			}
		});
	}, [media, onUpdateMedia]);

	return (
		<Box
			flex={1}
			direction="row"
			padding="small"
			style={{
				position: 'relative',
			}}
			onMouseEnter={() => setActive(true)}
			onMouseLeave={() => {
				setActive(false);
				setTagging(false);
				if (popover.current) {
					popover.current.close();
				}
			}}
		>
			<Fragment>
				<Img>
					<ResizableBox
						width={300}
						height={300}
						{...mediaData.size || {}}
						minConstraints={[100, 100]}
						maxConstraints={[1000, 1000]}
						onResize={handleResize}

						lockAspectRatio
						resizeHandles={['e']}
					>
						<Image
							center
							src={media.presignedUrl}
							fallbackUrl="/images/image-not-found.png"
							alt={media.filename}

							wrapperProps={{
								style: { height: '100%' }
							}}
						/>
					</ResizableBox>
				</Img>

				<FloatingHoverButton active={active}>
					<Menu
						ref={popover}
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
									<MenuItem
										component="a"
										type="default"
										href={media.presignedDownloadUrl}
										filename={media.filename}
										target="_blank"
										rel="noreferrer noopener"
										style={{
											display: 'block',
											verticalAlign: 'middle',
											minWidth: '0',
											width: 'auto',
										}}
									>
										<Icon
											path={mdiDownload}
											title="Download"
											color="currentColor"
											size={1}
											style={{ verticalAlign: 'middle' }}
										/>
										{' '}
										Download
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

				</FloatingHoverButton>
			</Fragment>
		</Box>
	);
};

export default ImagePanel;
