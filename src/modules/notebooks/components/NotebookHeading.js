import React from 'react';
import styled from '@emotion/styled';
import { types } from '@clarityhub/unity-web/lib/theme/fonts';
import DebouncedInput from 'designsystem/DebouncedInput';

const HeaderInput = styled.input`
	${types.h2};

	margin: 0;
	padding: 0;
	border: 0;
	width: 100%;
`;

const NotebookHeading = ({ title, onChange }) => {
	return (
		<DebouncedInput Input={HeaderInput} onChange={onChange} defaultValue={title} />
	);
};

export default NotebookHeading;
