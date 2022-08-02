import React, { Fragment, useState } from 'react';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Card, {
	CardBody,
} from '@clarityhub/unity-web/lib/components/Card';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import { Menu, MenuItem } from '@clarityhub/unity-web/lib/components/Menu';
import Button from '@clarityhub/unity-web/lib/components/Button';
import {
	mdiTag,
	mdiDownload,
	mdiDotsVertical,
} from '@mdi/js';
import Icon from '@mdi/react';

import TagEditor from 'modules/tags/containers/TagEditor';

const DefaultPanel = ({ media, tagInfo }) => {
	const [tagging, setTagging] = useState(false);

	return (
		<Card>
			<CardBody>
				<Box direction="row">
					<Box flex={1}>
						<Typography>
							<b>{media.filename}</b>
						</Typography>

					</Box>
					<Box>
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
					</Box>
				</Box>

			</CardBody>
		</Card>
	);
};


export default DefaultPanel;
