/** @jsx jsx */
import { Link } from 'react-router-dom';
import { jsx, css } from '@emotion/core';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Card, { CardHeader, CardFooter, CardBody } from '@clarityhub/unity-web/lib/components/Card';
import { useLocale } from '@clarityhub/unity-web/lib/contexts/Localization';
import ReadOnlyTagList from 'modules/tags/containers/ReadOnlyTagList';
import { mdiMicrophone, mdiVideo } from '@mdi/js';

import Icon from '@mdi/react';

import PreviewNotes from './PreviewNotes';

const InterviewIcon = ({ interview }) => {
	const type = interview.action && interview.action.type;
	let props = null;

	switch (type) {
	case 'audio':
		props = {
			path: mdiMicrophone,
			title: 'Audio Recording',
		};
		break;
	case 'video':
		props = {
			path: mdiVideo,
			title: 'Video Recording',
		};
		break;
	default:
		return null;
	}

	if (props) {
		return (
			<span style={{ verticalAlign: 'top' }}>
				<Icon
					size={1.2}
					{...props}
				/>
				{' '}
			</span>
		);
	}
	return null;

};

const InterviewItemRenderer = ({ item, onClick }) => {
	const [locale] = useLocale();

	const handleClick = (e) => {
		if (onClick) {
			e.preventDefault();

			onClick(item);
		}

		// TODO make sure the link still works
	};

	return (
		<Link to={`/interviews/${item.id}`} onClick={handleClick} css={css`
			text-decoration: none;
			flex: 1;
    		display: flex;

			${Card} {
				flex: 1;
			}
		`}>
			<Card>
				<CardHeader css={{ paddingRight: '3rem' }}>
					<InterviewIcon interview={item} />
					{item.title}
				</CardHeader>
				<CardBody>
					<Box margin={{ bottom: 'small' }}>
						<ReadOnlyTagList
							itemType="interviewV2"
							itemId={item.id}
						/>
					</Box>

					<PreviewNotes>
						{item.notes}
					</PreviewNotes>
				</CardBody>
				<CardFooter>
					Last Updated
					{' '}
					{new Date(item.updatedAt).toLocaleDateString(locale)}
				</CardFooter>
			</Card>
		</Link>
	);
};

export default InterviewItemRenderer;
