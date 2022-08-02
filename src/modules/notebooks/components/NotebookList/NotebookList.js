import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { MenuItem } from '@clarityhub/unity-web/lib/components/Menu';
import Button from '@clarityhub/unity-web/lib/components/Button';
import { mdiNotebookOutline } from '@mdi/js';
import { Error, Empty } from '@clarityhub/unity-web/lib/components/Messaging';
import CardFilterList from 'designsystem/CardFilterList';
import mergeTags from 'modules/tags/utilities/mergeTags';
import sortNewestToOldest from 'utilities/sortNewestToOldest';

import notebookFilter from '../../utilities/notebookFilter';
import DeleteNotebookModal from '../DeleteNotebookModal';
import NotebookItemRenderer from './NotebookItemRenderer';
import NotebookCreateCard from './NotebookCreateCard';

const NotebookList = ({ notebooks, error, isReady, onDelete }) => {
	const [deleteModalOpen, setModalOpen] = useState(false);
	const [notebookToDelete, setNotebookToDelete] = useState();

	const handleDelete = (id) => (e) => {
		e.preventDefault();
		e.stopPropagation();
		onDelete(id);
		closeDeleteModal();
	};

	const closeDeleteModal = () => {
		setModalOpen(false);
		setNotebookToDelete(null);
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
				empty={() => (
					<Empty
						icon={mdiNotebookOutline}
						message="Create your first Notebook"
						details="Notebooks let you organize your customer interviews, notes, and photos together in one place."
						actions={[
							<div>
								<Button as={Link} type="primary" to="/notebooks/create">
									Create a Notebook
								</Button>
							</div>,
						]}
					/>
				)}
				tags={mergeTags(notebooks.map(notebook => notebook.meta.tags))}
				actions={[
					<Link to="/notebooks/create">
						<Button type="primary">
							+ Create
						</Button>
					</Link>,
				]}
				items={notebooks}
				search={notebookFilter}
				menuItems={({ getRef, item }) => [
					onDelete && <MenuItem
						type="danger"
						onClick={(e) => {
							setNotebookToDelete(item);
							setModalOpen(true);
							getRef().current.close();
						}}
					>
						Delete
					</MenuItem>,
				].filter(Boolean)}
				createCard={NotebookCreateCard}
				itemRenderer={NotebookItemRenderer}
			/>
		);
	}

	return (
		<Fragment>
			{content}
			{
				deleteModalOpen && (
					<DeleteNotebookModal
						onClose={closeDeleteModal}
						onDelete={handleDelete}
						notebook={notebookToDelete}
					/>
				)
			}
		</Fragment>
	);
};

export default NotebookList;
