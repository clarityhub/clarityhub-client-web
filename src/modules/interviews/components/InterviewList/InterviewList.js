import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Button from '@clarityhub/unity-web/lib/components/Button';
import { mdiAccountVoice } from '@mdi/js';
import { Error, Empty } from '@clarityhub/unity-web/lib/components/Messaging';
import { MenuItem } from '@clarityhub/unity-web/lib/components/Menu';
import CardFilterList from 'designsystem/CardFilterList';
import mergeTags from 'modules/tags/utilities/mergeTags';
import sortNewestToOldest from 'utilities/sortNewestToOldest';

import DeleteInterviewModal from '../DeleteInterviewModal';
import interviewFilter from '../../utilities/interviewFilter';
import InterviewCreateCard from './InterviewCreateCard';
import InterviewItemRenderer from './InterviewItemRenderer';

const InterviewList = ({ interviews, error, isReady, onDelete, hideCreate, onClick, empty }) => {
	const [deleteModalOpen, setModalOpen] = useState(false);
	const [interviewToDelete, setInterviewToDelete] = useState(false);

	const handleDelete = (id) => (e) => {
		e.preventDefault();
		e.stopPropagation();
		onDelete(id);
		closeDeleteModal();
	};

	const closeDeleteModal = () => {
		setModalOpen(false);
		setInterviewToDelete(null);
	};

	let content = null;

	if (error) {
		content = <Error error={error} />;
	} else if (!isReady) {
		content = <Loading flex size={2} />;
	} else {
		content = (
			<CardFilterList
				defaultSort={sortNewestToOldest}
				empty={() => empty || <Empty
					icon={mdiAccountVoice}
					message="Start your first Interview"
					details="Start an audio recording and organize your customer interviews"
					actions={[
						<div>
							<Button as={Link} type="primary" to="/interviews/create">
									Start an Interview
							</Button>
						</div>,
					]}
				/>
				}
				tags={mergeTags(interviews.map(interview => interview.meta.tags))}
				actions={[
					!hideCreate && (
						<Link to="/interviews/create">
							<Button type="primary">
								+ Create
							</Button>
						</Link>
					),
				].filter(Boolean)}
				items={interviews}
				search={interviewFilter}
				menuItems={onDelete && (
					({ getRef, item }) => [
						onDelete && <MenuItem
							type="danger"
							onClick={(e) => {
								setInterviewToDelete(item);
								setModalOpen(true);
								getRef().current.close();
							}}
						>
							Delete
						</MenuItem>,
					].filter(Boolean)
				)}
				createCard={!hideCreate && InterviewCreateCard}
				itemRenderer={(props) => <InterviewItemRenderer {...props} onClick={onClick} />}
			/>
		);
	}

	return (
		<Fragment>
			{content}
			{
				deleteModalOpen && (
					<DeleteInterviewModal
						onClose={closeDeleteModal}
						onDelete={handleDelete}
						interview={interviewToDelete}
					/>
				)
			}
		</Fragment>
	);
};

export default InterviewList;
