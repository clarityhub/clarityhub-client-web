import React, { useCallback, Fragment } from 'react';
import { shape, string, func } from 'prop-types';
import styled from '@emotion/styled';
import { types } from '@clarityhub/unity-web/lib/theme/fonts';
import DebouncedInput from 'designsystem/DebouncedInput';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import InputGroup from '@clarityhub/unity-web/lib/forms/InputGroup';
import LabelledTextarea from '@clarityhub/unity-web/lib/forms/LabelledTextarea';
import TagList from 'modules/tags/containers/TagList';
import { mdiPlus } from '@mdi/js';
import { Icon } from '@mdi/react';

const HeaderInput = styled.input`
	${types.h2};

	margin: 0;
	padding: 0;
	border: 0;
	width: 100%;
`;

const InterviewDetails = ({ interview, onChangeDetails, onEmbedInNotebook }) => {
	const { title, notes } = interview;

	const handleTitleChange = useCallback((title) => {
		onChangeDetails({ title });
	}, [onChangeDetails]);
	const handleNotesChange = useCallback((notes) => {
		onChangeDetails({ notes });
	}, [onChangeDetails]);
	const handleEmbedInNotebook = useCallback(() => {
		onEmbedInNotebook();
	}, [onEmbedInNotebook]);

	return (
		<Fragment>
			<Box direction="row">
				<Box flex={1}>
					<DebouncedInput Input={HeaderInput} onChange={handleTitleChange} defaultValue={title} />
				</Box>
				<Box>
					<Button
						size="small"
						outline
						type="primary"
						onClick={handleEmbedInNotebook}
						style={{ verticalAlign: 'middle' }}
					>
						<Icon
							color="currentColor"
							path={mdiPlus}
							size={0.8}
							style={{ verticalAlign: 'text-top' }}
						/>
						{' '}
						Embed in New Notebook
					</Button>
				</Box>
			</Box>


			<TagList
				itemId={interview.id}
				itemType="interviewV2"
				itemPreview={interview.title}
			/>

			<InputGroup>
				<DebouncedInput
					Input={LabelledTextarea}
					label="Notes"
					onChange={handleNotesChange}
					defaultValue={notes}
				/>
          	</InputGroup>
		</Fragment>
	);
};

InterviewDetails.propTypes = {
	interview: shape({
		title: string,
		notes: string,
	}),
	onChangeDetails: func.isRequired,
};

export default InterviewDetails;
