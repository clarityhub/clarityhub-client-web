/** @jsx jsx */
import { Fragment } from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import Badge from '@clarityhub/unity-web/lib/components/Badge';
import {
	mdiAlertCircleOutline,
	mdiChevronRight,
	mdiLoading,
} from '@mdi/js';
import Icon from '@mdi/react';

const WrapperButton = styled.button`
	background: transparent;
	border: 0;
	cursor: pointer;
`;

const TranscriptionState = ({ transcriptionStatus, transcriptionError, onViewMedia }) => {
	switch (transcriptionStatus) {
	case 'IN_PROGRESS':
		return (
			<Badge>
				Transcribing
				{' '}
				<Icon
					style={{ 'vertical-align': 'text-top' }}
					path={mdiLoading}
					color="currentColor"
					size="1.125rem"
					spin
				/>
			</Badge>
		);
	case 'COMPLETED':
		return (
			<WrapperButton onClick={onViewMedia}>
				<Badge type="success" css={css`
					width: 100%;
				`}>
					Transcription
					{' '}
					<Icon
						style={{ 'vertical-align': 'text-top' }}
						path={mdiChevronRight}
						color="currentColor"
						size="1.125rem"
					/>
				</Badge>
			</WrapperButton>
		);
	case 'FAILED':
	default:
		return (
			<Fragment>
				<Badge type="danger">
					Transcription Failed
					{' '}
					<Icon
						style={{ 'vertical-align': 'text-top' }}
						color="currentColor"
						path={mdiAlertCircleOutline}
						size="1.125rem"
					/>
				</Badge>
				{transcriptionError}
			</Fragment>
		);
	}
};

export default TranscriptionState;
