import React, { useEffect, useState, useCallback } from 'react';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import { Error } from '@clarityhub/unity-web/lib/components/Messaging';
import { func, object } from 'prop-types';

const LoaderContainer = ({ children, onMount = () => Promise.resolve({}), errorProps = {}, loadingProps = {} }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const doEffect = useCallback(async () => {
		try {
			setLoading(true);
			const resp = await onMount();
			setLoading(false);
			setData(resp);
		} catch (error) {
			setLoading(false);
			setError(true);
		}
	}, [onMount]);

	const retry = useCallback(() => {
		return doEffect();
	}, [doEffect]);

	useEffect(() => {
		doEffect();
	}, [doEffect]);

	if (error) {
		return <Error error={error} {...errorProps} />;
	}

	if (loading) {
		return <Loading flex size={2} {...loadingProps } />;
	}

	return children({
		data,
		retry,
	});
};

LoaderContainer.propTypes = {
	children: func.isRequired,
	errorProps: object,
	loadingProps: object,
	onMount: func,
};

export default LoaderContainer;
