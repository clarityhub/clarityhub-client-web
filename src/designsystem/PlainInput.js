import React, { forwardRef } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { variants } from '@clarityhub/unity-core/lib/typography';
import colors from '@clarityhub/unity-core/lib/colors';
import { lighten, desaturate } from '@clarityhub/unity-core/lib/utilities/color';

const inputHeight = 2.670;

const baseInput = ({ error }) => css`
    box-sizing: border-box;
    display: inline-block;
    font-size: 1rem;
    line-height: 1.2rem;
    margin-bottom: 0;
    /* min-width: 250px; */
    min-height: ${inputHeight}rem;
    padding: 0.625rem 1rem;
    transition: all 0.2s ease-in;
    transition-property: border-bottom-width, border-bottom-color, color, margin-bottom;
    width: 100%;
    resize: vertical;

    ${variants.text.string}

    &:active,
    &:focus {
        outline: 0;
    }

    &:disabled {
        cursor: not-allowed;
    }

    &::placeholder,
    &::-webkit-datetime-edit-month-field,
    &::-webkit-datetime-edit-day-field,
    &::-webkit-datetime-edit-year-field {
        color: ${colors.gray.default};
    }

    &[type=date] {
        &::-webkit-inner-spin-button {
            height: 0.8rem
        }

        &::-webkit-calendar-picker-indicator {
            height: 0.8rem;
        }
    }

    ${error && css`
        background-color: ${desaturate(lighten(colors.danger.default, 0.85), 0.4)};
        outline: 0;
    `}
`;

const Input = styled.input`
    border: 0;
    ${({ error }) => baseInput({ error })}

    &:disabled {
        background-color: ${colors.muted.default};
    }

    &:active,
    &:focus {
        background-color: ${colors.dove.default};
    }

    ${({ error }) => error && css`
        background-color: ${colors.danger.default};
    `}
`;

const PlainInput = forwardRef(({
	children,
	error = false,
	height,
	label,
	inputType = 'input',
	variant,
	...rest
}, ref) => {
	return (
		<Input ref={ref} variant={variant} error={error} {...rest} />
	);
});

export default PlainInput;
