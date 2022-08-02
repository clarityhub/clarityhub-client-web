import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Box from '@clarityhub/unity-web/lib/scaffolding/Box';

const Icon = styled.div`
	width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-self: center;
    justify-self: center;
    margin-right: 1rem;
    margin-bottom: 1rem;
    background-color: red;
    text-align: center;
    align-content: center;
    justify-content: center;
    line-height: 2rem;
    color: white;
    font-weight: bold;

	${({ number }) => {
		const colors = [
			'#B40201',
			'#0033F3',
			'#00624A',
			'#9A009F',
			'#005C8B',
			'#1D6420',
			'#983500',
			'#743580',
			'#973557',
			'#386000',
		];

		const color = colors[number % colors.length];

		return css`
			background-color: ${color};
		`;
	}}
`;

const TimeWrapper = styled(Typography)`
	color: #aaa;
	display: inline-block;
	margin-left: 1rem;
`;

TimeWrapper.defaultProps = {
	component: 'span',
};

const SpeakerWrapper = styled(Typography)`
	font-weight: bold;
	display: inline-block;
`;

SpeakerWrapper.defaultProps = {
	component: 'span',
};

const SpeakerIcon = ({ speaker }) => {
	const [, number] = speaker.split('_');

	return (
		<Icon number={parseInt(number, 10)}>
			{parseInt(number, 10) + 1}
		</Icon>
	);
};

const Time = ({ startTime }) => {
	return (
		<TimeWrapper>
			{startTime}
		</TimeWrapper>
	);
};

const Speaker = ({ speaker }) => {
	const [, number] = speaker.split('_');

	return (
		<SpeakerWrapper>
		Speaker {parseInt(number, 10) + 1}
		</SpeakerWrapper>

	);
};

const TranscriptionPanel = ({ attributes, children, data }) => {
	return (
		<Box flex={1} direction="row">
			<Box>
				<SpeakerIcon speaker={data.speaker} />
			</Box>
			<Box>
				<div>
					<Speaker speaker={data.speaker} />
					<Time startTime={data.startTime} />
				</div>
				<div>
					<span {...attributes}>{children}</span>
				</div>
			</Box>
		</Box>
	);
};

export default TranscriptionPanel;
