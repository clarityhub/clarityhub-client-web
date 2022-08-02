import { useState, useCallback } from 'react';

export default function usePersistentState(defaultValue, key) {
	const [value, setValue] = useState(() => {
		let val = defaultValue;

		if (typeof defaultValue === 'function') {
			val = defaultValue();
		}

		if (typeof window.localStorage !== 'undefined') {
			const storageVal = window.localStorage.getItem(key);

			try {
				val = JSON.parse(storageVal);
			} catch (e) {
				// Do nothing
			}
		}

		return val;
	});

	const setPersistentValue = useCallback((val) => {
		if (typeof window.localStorage !== 'undefined') {
			window.localStorage.setItem(key, JSON.stringify(val));
		}

		setValue(val);
	}, [key]);

	return [value, setPersistentValue];
}
