import React, { useState } from 'react';
import { connect } from 'react-redux';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import { mdiMicrophone, mdiVideo } from '@mdi/js';
import Icon from '@mdi/react';
import Card, { CardFooter, CardBody } from '@clarityhub/unity-web/lib/components/Card';
import { Cards } from 'designsystem/CardFilterList';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import { createMedia } from 'modules/medias/store/actions';
import createAudioRecordingDetails from 'modules/medias/utilities/createAudioRecordingDetails';
import MediaPanel from 'modules/medias/containers/MediaPanel';
import VideoCallPanel from 'modules/videoCalls/containers/VideoCallPanel';
import { createVideoCall } from 'modules/videoCalls/store/actions';
import VideoCallForm from 'modules/videoCalls/components/VideoCallForm';

import { updateInterview } from '../store/actions';
import generatePassword from '../utilities/generatePassword';

const RenderInverviewMedia = ({ interview, flat }) => {
	switch (interview.action.type) {
	case 'video':
		return (
			<Box margin={{ top: 'medium' }}>
				<VideoCallPanel
					flat={flat}
					parentId={interview.id}
					videoCallId={interview.action.videoCallId}
					referencePath={`/interviews/${interview.id}`}
				/>
			</Box>
		);
	case 'audio':
		return (
			<Box margin={{ top: 'medium' }}>
				<MediaPanel
					flat={flat}
					mediaId={interview.action.mediaId}
					referencePath={`/interviews/${interview.id}`}
				/>
			</Box>
		);
	default:
		return (
			<Box margin={{ top: 'medium' }}>
				<Error error="Unknown Interview Type" />
			</Box>
		);
	}
};

const ACTIONS = [
	{
		icon: mdiMicrophone,
		title: 'Audio',
		description: 'Record audio from your device',
		actionText: 'Record',
		onSelect: async ({ interview, createMedia, updateInterview }) => {
			const media = await createMedia(createAudioRecordingDetails());

			const nextInterview = await updateInterview(interview.id, {
				action: {
					type: 'audio',
					mediaId: media.id,
				},
			});

			return {
				media,
				interview: nextInterview,
			};
		},
	},
	{
		icon: mdiVideo,
		title: 'Video Call',
		description: 'Start a video call and share a link to the call with others',
		actionText: 'Start Video Call',
		onSelectDetails({ interview, onSubmit }) {
			return <VideoCallForm
				initialFormData={{
					videoName: interview.title,
					videoPassword: generatePassword(),
				}}
				onSubmit={onSubmit}
			/>;
		},
		onSelect: async ({ interview, formData, createVideoCall, updateInterview, setForm }) => {
			const payload = {
				publicName: formData.videoName,
				password: formData.videoPassword,
			};
			const videoCall = await createVideoCall(payload);
			const nextInterview = await updateInterview(interview.id, {
				action: {
					type: 'video',
					videoCallId: videoCall.id,
				},
			});

			setForm(null);

			return {
				videoCall,
				interview: nextInterview,
			};
		}
	},
];

const InterviewMediaContainer = ({ showSelection = true, interview, createMedia, createVideoCall, updateInterview, ...props }) => {
	const [form, setForm] = useState(null);

	const handleAction = (action = {}) => () => {
		const base = {
			interview, createMedia, createVideoCall, updateInterview
		};

		const onSubmit = (formData) => {
			return action.onSelect({ ...base, formData, setForm });
		};

		if (action.onSelectDetails) {
			setForm(() => action.onSelectDetails({ ...base, onSubmit }));
			return;
		}

		action.onSelect({ ...base });
	};


	if (!interview.action) {
		if (!showSelection) {
			return null;
		}

		if (form) {
			return (
				<Box margin={{ top: 'medium' }}>
					<Card>
						<CardBody>
							{form}
						</CardBody>
					</Card>
				</Box>
			);
		}

		return (
			<Box>
				<Cards items={ACTIONS}>
					{({ item }) => {
						return (
							<Card style={{ opacity: item.disabled ? 0.6 : 1 }}>
								<CardBody>
									<Box style={{ textAlign: 'center' }}>
										<Icon
											path={item.icon}
											title="Action"
											size={2}
											style={{ margin: 'auto' }}
										/>
										<Typography type="h4" noMargin noPadding>
											{item.title}
										</Typography>
										<Typography>
											{item.description}
										</Typography>
									</Box>
								</CardBody>
								<CardFooter>
									<Button
										disabled={item.disabled}
										block
										type="primary"
										onClick={handleAction(item)}
									>
										{item.actionText}
									</Button>
								</CardFooter>
							</Card>
						);
					}}
				</Cards>
			</Box>
		);
	}

	return (
		<RenderInverviewMedia interview={interview} {...props} />
	);
};

const mapStateToProps = (state) => {
	return {

	};
};

const mapDispatchToProps = {
	createMedia,
	updateInterview,
	createVideoCall,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(InterviewMediaContainer);
