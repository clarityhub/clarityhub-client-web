import React from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import InterviewMediaContainer from '../containers/InterviewMediaContainer';

const InterviewPanel = ({ interview, onViewInterview }) => {
	return (
		<Card>
			<CardBody>
				<Box direction="row">
					<Box flex={1}>
						<Typography type="h3">
							{interview.title}
						</Typography>
					</Box>
					<Box>
						<Button
							size="small"
							outline
							type="primary"
							onClick={onViewInterview}
						>
                            View Interview
						</Button>
					</Box>
				</Box>

				{/* Eventually show tags here... */}

				<Typography>
					{interview.notes}
				</Typography>


				<InterviewMediaContainer
					showSelection={false}
					interview={interview}
					flat
				/>
			</CardBody>
		</Card>
	);
};

export default InterviewPanel;
