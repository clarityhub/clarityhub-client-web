import React, { useState, useCallback } from 'react';
import { func, node, string, number, oneOfType } from 'prop-types';
import debounce from 'lodash.debounce';

const SAVE_DELAY = 1000;
const noop = () => {};

const DebouncedInput = ({ Input = 'input', onChange = noop, defaultValue = '', delay = SAVE_DELAY, ...props }) => {
	const onChangeDebounced = useCallback(debounce(onChange, SAVE_DELAY), [onChange], { trailing: true });

	const [realtimeValue, setRealtimeValue] = useState(defaultValue);

	const handleChange = useCallback((e) => {
		const text = e.target.value;

		setRealtimeValue(text);

		onChangeDebounced(text);
	}, [onChangeDebounced]);

	return <Input onChange={handleChange} value={realtimeValue} {...props} />;
};

DebouncedInput.propTypes = {
	Input: oneOfType([func, node, string]),
	defaultValue: string,
	delay: number,
	onChange: func,
};

export default DebouncedInput;
