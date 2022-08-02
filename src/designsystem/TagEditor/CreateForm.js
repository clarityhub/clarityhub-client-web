import React, { useCallback, useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import PlainInput from 'designsystem/PlainInput';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import Button from '@clarityhub/unity-web/lib/components/Buttons';

import TagWrapper from './tagTypes/TagWrapper';

const Form = styled.form`
	display: flex;
`;

const CreateForm = ({ onAdd, children, placeholder, suggestedTag = '' }) => {
	const ref = useRef();
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [value, setValue] = useState(suggestedTag);

	useEffect(() => {
		if (ref.current) {
			ref.current.focus();
		}
	});

	useEffect(() => {
		setValue(suggestedTag);
	}, [suggestedTag]);

	const onSubmit = useCallback(async (e) => {
		e.preventDefault();

		if (isLoading) {
			return;
		}

		setIsLoading(true);

		await onAdd(value);

		setIsLoading(false);
		setValue('');
		setIsOpen(false);
	}, [isLoading, onAdd, value]);

	return (
		<div>
			{
				isOpen ? (
					<Form onSubmit={onSubmit}>
						<PlainInput
							disabled={isLoading}
							type="text"
							placeholder={placeholder}
							value={value}
							onChange={(e) => setValue(e.target.value)}
							ref={ref}
						/>
						<Button text type="submit" disabled={isLoading}>
							<Icon
								path={mdiPlus}
								title="Add"
								color="currentColor"
								size={0.8}
							/>
						</Button>
					</Form>
				) : (
					<TagWrapper onClick={() => setIsOpen(true)}>
						{children}
					</TagWrapper>
				)
			}

		</div>
	);

};

export default CreateForm;
