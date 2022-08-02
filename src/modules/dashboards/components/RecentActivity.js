/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { Link } from 'react-router-dom';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Icon from '@mdi/react';
import { mdiFileDocumentEditOutline, mdiAccountVoice, mdiAccount, mdiChevronUp, mdiAppsBox } from '@mdi/js';
import Card from '@clarityhub/unity-web/lib/components/Card';
import { formatRelative } from 'date-fns';

const RecentActivity = ({ items, workspace }) => {
	if (items.length === 0) {
		return (
			<Typography center>
				No recent activity yet
			</Typography>
		);
	}

	return (
		<Box gap="small" direction="column">
			{items.map((item) => {
				switch (item.action) {
				case 'integration.created':
					return (
						<Box key={item.activityId}>
							<Link
								to={`/settings/integrations/edit/${item.itemId}`}
								css={css`
									text-decoration: none;
								`}
							>
								<Card hoverable>
									<Box flex={1} direction="row" css={css`
											align-items: center;
											justify-items: center;
										`}>
										<Box padding={{ top: 'small', bottom: 'small', left: 'small' }}>
											<Icon
												path={mdiAppsBox}
												title="Integration Created"
												size={1}
												style={{ verticalAlign: 'middle' }}
											/>
										</Box>
										<Box flex={1} padding="small">
											<Typography noPadding noMargin>
												<b>{item.itemPreview ? item.itemPreview.appName : item.itemId} integration was created</b>
											</Typography>
											<Typography noPadding noMargin>
												Integration created {formatRelative(new Date(item.createdAt), new Date())}
											</Typography>
										</Box>

										<Box padding="small">
											<Icon
												path={mdiChevronUp}
												title="Go"
												rotate={90}
												size={2}
												style={{ verticalAlign: 'middle' }}
											/>
										</Box>
									</Box>
								</Card>
							</Link>
						</Box>
					);
				case 'member.joined':
					return (
						<Box key={item.activityId}>
							<Card>
								<Box flex={1} direction="row" css={css`
										align-items: center;
										justify-items: center;
									`}>
									<Box padding={{ top: 'small', bottom: 'small', left: 'small' }}>
										<Icon
											path={mdiAccount}
											title="Member Joined"
											size={1}
											style={{ verticalAlign: 'middle' }}
										/>
									</Box>
									<Box flex={1} padding="small">
										<Typography noPadding noMargin>
											<b>{item.itemPreview ? item.itemPreview.name || item.itemPreview.email : item.itemId} joined {workspace.name}</b>
										</Typography>
										<Typography noPadding noMargin>
											Member joined {formatRelative(new Date(item.createdAt), new Date())}
										</Typography>
									</Box>
								</Box>
							</Card>
						</Box>
					);
				case 'interview.created':
					return (
						<Box key={item.activityId}>
							<Link
								to={`/notebooks/${item.itemId}`}
								css={css`
									text-decoration: none;
								`}
							>
								<Card hoverable>
									<Box flex={1} direction="row" css={css`
										align-items: center;
										justify-items: center;
									`}>
										<Box padding={{ top: 'small', bottom: 'small', left: 'small' }}>
											<Icon
												path={mdiFileDocumentEditOutline}
												title="Notebook Created"
												size={1}
												style={{ verticalAlign: 'middle' }}
											/>
										</Box>
										<Box flex={1} padding="small">
											<Typography noPadding noMargin>
												<b>{(item ? item.item ? item.item.title : item.title : '') || ''}</b>
											</Typography>
											<Typography noPadding noMargin>
												Notebook created {formatRelative(new Date(item.createdAt), new Date())}
											</Typography>
										</Box>

										<Box padding="small">
											<Icon
												path={mdiChevronUp}
												title="Go"
												rotate={90}
												size={2}
												style={{ verticalAlign: 'middle' }}
											/>
										</Box>
									</Box>
								</Card>
							</Link>
						</Box>
					);
				case 'interviewV2.created':
					return (
						<Box key={item.activityId}>
							<Link
								to={`/interviews/${item.itemId}`}
								css={css`
									text-decoration: none;
								`}
							>
								<Card hoverable>
									<Box flex={1} direction="row" css={css`
										align-items: center;
										justify-items: center;
									`}>
										<Box padding={{ top: 'small', bottom: 'small', left: 'small' }}>
											<Icon
												path={mdiAccountVoice}
												title="Interview Created"
												size={1}
												style={{ verticalAlign: 'middle' }}
											/>
										</Box>
										<Box flex={1} padding="small">
											<Typography noPadding noMargin>
												<b>{(item ? item.item ? item.item.title : item.title : '') || ''}</b>
											</Typography>
											<Typography noPadding noMargin>
												Interview created {formatRelative(new Date(item.createdAt), new Date())}
											</Typography>
										</Box>

										<Box padding="small">
											<Icon
												path={mdiChevronUp}
												title="Go"
												rotate={90}
												size={2}
												style={{ verticalAlign: 'middle' }}
											/>
										</Box>
									</Box>
								</Card>
							</Link>
						</Box>
					);
				default:
					return null;
				}
			})}
		</Box>
	);
};

export default RecentActivity;
