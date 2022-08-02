import React from 'react';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';
import Dismissable from '@clarityhub/unity-web/lib/interactions/Dismissable';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';

const OnboardingCard = ({ onDismiss, children }) => {
	return (
		<Box margin={{ bottom: 'large' }}>
			<Dismissable onDismiss={onDismiss}>
				{({ Dismiss }) => (
					<Card type="highlight" flat>
						<Dismiss />

						<CardBody>
							{children}
						</CardBody>
					</Card>
				)}
			</Dismissable>
		</Box>
	);
};

export default OnboardingCard;
