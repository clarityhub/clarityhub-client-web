/** @jsx jsx */
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import { mdiAccountVoice } from '@mdi/js';
import Icon from '@mdi/react';

const CreateNotebookWrapper = styled.div`
	flex: 1;
	text-align: center;
	justify-self: center;
	align-self: center;
`;

const InterviewCreateCard = () => {
	return (
		<Link to="/interviews/create" css={css`
			color: initial;
			text-decoration: none;
			flex: 1;
    		display: flex;
			height: 100%;
			justify-content: center;
		
			${Card} {
				flex: 1;
			}

			${CardBody} {
				display: flex;
			}
		`}>
			<Card style={{ height: '100%', alignContent: 'center' }}>
				<CardBody>
					<CreateNotebookWrapper>
						<Icon
							path={mdiAccountVoice}
							color="currentColor"
							title={'Create a Notebook'}
							size={2}
						/>
						<Typography type="h4">
							Create an Interview
						</Typography>
					</CreateNotebookWrapper>
				</CardBody>
			</Card>
		</Link>
	);
};

export default InterviewCreateCard;
