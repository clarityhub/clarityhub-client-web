import React, { Fragment } from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Card, {
	CardBody,
} from '@clarityhub/unity-web/lib/components/Card';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import CopyToClipboard from '@clarityhub/unity-web/lib/interactions/CopyToClipboard';
import Button from '@clarityhub/unity-web/lib/components/Button';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';
import LabelledInput from '@clarityhub/unity-web/lib/forms/LabelledInput';
import InputGroupAppend from '@clarityhub/unity-web/lib/forms/InputGroupAppend';
import MediaPanel from 'modules/medias/containers/MediaPanel';
import { Accordion, AccordionItem, AccordionSummary, AccordionDetails } from '@clarityhub/unity-web/lib/components/Accordion';
import Icon from '@mdi/react';
import {
	mdiChevronUp,
} from '@mdi/js';
import getVideoCallLink from '../utilities/getVideoCallLink.ts';
import VideoCallActions from './VideoCallActions';
import VideoCallStatusBadge from './VideoCallStatusBadge';

const VideoCallPanel = ({ videoCall, flat, ...props }) => {
	const link = getVideoCallLink(videoCall);
	return (
		<Card flat={flat}>
			<CardBody>
				<Box margin={{ bottom: 'small' }}>
					<Box margin={{ bottom: 'small' }}>
						<Typography type="h3" noPadding noMargin>Video Call – {videoCall.publicName}</Typography>
					</Box>
					<div>
						<VideoCallStatusBadge status={videoCall.status} />
					</div>
					{videoCall.status !== 'COMPLETE' && (
						<Fragment>
							<CopyToClipboard>
								{({ onClick }) => (
									<InputGroup>
										<LabelledInput label="Magic Link" readonly value={link} />
										<InputGroupAppend>
											<Button outline type="primary" onClick={() => onClick(link)}>
												Copy
											</Button>
										</InputGroupAppend>
									</InputGroup>
								)}
							</CopyToClipboard>
							<div>
								<Typography type="sectionLabel">Share this link with your participants.</Typography>
								<Typography type="sectionLabel">The room will not be active until you click "Start Video Call" below.</Typography>
							</div>
						</Fragment>
					)}
				</Box>

				<Box margin={{ bottom: 'small' }}>
					<Accordion>
						<AccordionItem flat>
							<AccordionSummary expandIcon={(
								<Icon
									path={mdiChevronUp}
									title="mute-enabled"
									color="currentColor"
									size={1}
									rotate={180}
								/>
							)}>
								<Typography
									inline
									noMargin
									noPadding
									type="text"
									style={{ marginRight: '30px' }}
								>
									<b>Recordings</b>
								</Typography>
								<Typography inline noMargin noPadding type="text">Click to expand</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{videoCall.mediaIds && (
									<Fragment>
										{videoCall.mediaIds.map((id) => {
											return (
												<Box margin={{ top: 'small' }} key={id}>
													<MediaPanel
														mediaId={id}
														referencePath={`/interviews/${props.parentId}`}
													/>
												</Box>
											);
										})}
									</Fragment>
								)}
							</AccordionDetails>
						</AccordionItem>
					</Accordion>
				</Box>

				<Box>
					<div>
						<VideoCallActions videoCall={videoCall} {...props} />
					</div>
				</Box>
			</CardBody>
		</Card>
	);
};

export default VideoCallPanel;
