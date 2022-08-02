import React, { useReducer, Fragment } from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Accordion, AccordionItem, AccordionSummary, AccordionDetails } from '@clarityhub/unity-web/lib/components/Accordion';
import {
	mdiChevronDown,
	mdiTrashCan,
	mdiPencil,
} from '@mdi/js';
import Icon from '@mdi/react';

import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import ItemBadge from 'designsystem/TagEditor/tagTypes/ItemBadge';

import DeleteTagModal from './DeleteTagModal';
import CreateTagModal from './CreateTagModal';
import UpdateTagModal from './UpdateTagModal';

const ExpandMoreIcon = () => {
	return (
		<Icon
			path={mdiChevronDown}
			color="currentColor"
			title={'Expand'}
			size="1.1rem"
		/>
	);
};

const hasCategory = (tagId, categories) => {
	return categories.findIndex(c => c.tagId === tagId);
};

const tagsToCategories = (tags) => {
	const categories = [];

	tags.forEach((tag) => {
		if (tag.parentTagId) {
			// Add to parent
			let index = hasCategory(tag.parentTagId, categories);

			if (index === -1) {
				// create a placeholder
				categories.push({
					tagId: tag.parentTagId,
					children: [],
				});
				index = categories.length - 1;
			}

			// add as child
			categories[index].children.push(tag);
		} else {
			// Create/update entry
			let index = hasCategory(tag.tagId, categories);

			if (index === -1) {
				// add
				categories.push({
					...tag,
					children: [],
				});
			} else {
				categories[index] = {
					...tag,
					children: categories[index].children,
				};
			}
		}
	});

	return categories;
};

const reducer = (state, action = {}) => {
	switch (action.type) {
	case 'openCreate':
		return {
			open: true,
			modal: 'create',
			modalOptions: action.modalOptions,
		};
	case 'openUpdate':
		return {
			open: true,
			modal: 'update',
			modalOptions: action.modalOptions,
		};
	case 'openDelete':
		return {
			open: true,
			modal: 'delete',
			modalOptions: action.modalOptions,
		};
	case 'close':
		return {
			open: false,
			modal: null,
		};
	default:
		return state;
	}
};

const TagRow = ({ dispatch, tag }) => {
	return (
		<Box direction="row">
			<Box flex={1}>
				<div>
					<ItemBadge
						tag={tag}
					/>
				</div>
			</Box>
			<Box direction="row">
				<Button
					text
					size="small"
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();

						dispatch({
							type: 'openUpdate',
							modalOptions: {
								tag: tag,
							},
						});
					}}
				>
					<Icon
						path={mdiPencil}
						color="currentColor"
						title={'Edit'}
						size="1.1rem"
					/>
				</Button>
				<Button
					text
					size="small"
					type="danger"
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();

						dispatch({
							type: 'openDelete',
							modalOptions: {
								tag: tag,
							},
						});
					}}
				>
					<Icon
						path={mdiTrashCan}
						color="currentColor"
						title={'Delete'}
						size="1.1rem"
					/>
				</Button>
			</Box>
		</Box>

	);
};

const TagsTable = ({
	tags,
	error,
	isReady,
	onCreateTag,
	onUpdateTag,
	onDeleteTag,
}) => {
	const [state, dispatch] = useReducer(reducer, {
		open: false,
		modal: null,
	});

	const closeModal = () => {
		dispatch({
			type: 'close',
		});
	};

	const onDelete = (id) => async (e) => {
		e.preventDefault();
		e.stopPropagation();
		await onDeleteTag(id);
		closeModal();
	};

	const onUpdate = async (data, options) => {
		const { tag, color } = data;
		const submitData = { tag, color };

		if (submitData.color && submitData.color.startsWith('#')) {
			submitData.color = submitData.color.slice('1');
		}

		await onUpdateTag(options.tag.tagPath, submitData);
		closeModal();
	};

	const onCreate = async (data, { tag: parentTag }) => {
		let submitData = { ...data };

		if (parentTag) {
			submitData.parentTagId = parentTag.tagId;
		}

		if (submitData.color && submitData.color.startsWith('#')) {
			submitData.color = submitData.color.slice('1');
		}

		await onCreateTag(submitData);
		closeModal();
	};

	let content;

	if (error) {
		content = <Error error={error} />;
	} else if (!isReady) {
		content = <Loading flex size={2} />;
	} else {
		// todo cache result so we don't constantly re-compute
		const categories = tagsToCategories(tags);

		content = (
			<Box margin={{ top: 'medium' }}>
				<Accordion>
					{categories.map(category => {
						return (
							<AccordionItem key={category.tagId}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<TagRow
										dispatch={dispatch}
										tag={category}
									/>
								</AccordionSummary>
								<AccordionDetails>
									<Box margin={{ left: 'small', right: 'small' }}>
										<Box margin={{ bottom: 'small' }}>
											{category.children.length === 0 && (
												<Typography>
                                                    No tags for this category.
												</Typography>
											)}
											{category.children.map(tag => {
												return (
													<TagRow
														key={tag.tagPath}
														dispatch={dispatch}
														tag={tag}
													/>

												);
											})}
										</Box>

										<div>
											<Button
												type="primary"
												onClick={(e) => {
													dispatch({
														type: 'openCreate',
														modalOptions: {
															tag: category,
														},
													});
												}}
											>
                                                Create Tag
											</Button>
										</div>
									</Box>
								</AccordionDetails>
							</AccordionItem>
						);
					})}
				</Accordion>

				<Box margin={{ top: 'medium' }}>
					<div>
				        <Button
							type="primary"
							onClick={(e) => {
								e.preventDefault();
								dispatch({
									type: 'openCreate',
									modalOptions: {
										tag: null,
									},
								});
							}}
						>
                            Create Category
						</Button>
					</div>
				</Box>
			</Box>
		);
	}

	return (
		<Fragment>
			<Box>
				{content}
			</Box>

			<UpdateTagModal
				open={state.modal === 'update' && state.open}
				onClose={closeModal}
				onUpdate={onUpdate}
				{...state.modalOptions}
			/>

			<CreateTagModal
				open={state.modal === 'create' && state.open}
				onClose={closeModal}
				onCreate={onCreate}
				{...state.modalOptions}
			/>

			<DeleteTagModal
				open={state.modal === 'delete' && state.open}
				onClose={closeModal}
				onDelete={onDelete}
				{...state.modalOptions}
			/>
		</Fragment>
	);
};

export default TagsTable;
