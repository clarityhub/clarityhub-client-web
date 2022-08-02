import { getStore } from 'store.js';
import { logout, refresh } from 'modules/auth/store/actions';

const BASE_URL = process.env.REACT_APP_API_BASE;
const MAX_RETRIES = 10;

const cache = new Map();
const hash = (url, options) => {
	return `${url}/${JSON.stringify(options)}`;
};

const hasMadeRequest = (url, options) => {
	const key = hash(url, options);

	return cache.has(key);
};

const getInFlightRequest = (url, options) => {
	const key = hash(url, options);

	return cache.get(key);
};

const setInFlightRequest = (url, options, promise, timeout) => {
	const key = hash(url, options);

	cache.set(key, promise);

	setTimeout(() => {
		cache.delete(key);
	}, timeout);
};

const generateHeaders = (options) => {
	return {
		Authorization: `Bearer ${options.token}`,
		'Content-Type': 'application/json',
	};
};

const TIMEOUT = 1000;

const apiFetch = (url, options) => {
	if (options.method === 'GET' || !options.method) {
		// Run deduplicate check

		// TODO try to make this more atomic. It isn't
		// super safe to to a check and then a get
		if (hasMadeRequest(url, options)) {
			return getInFlightRequest(url, options);
		}
	}

	const retryAttempt = options.retryAttempt || 0;
	const noRetry = options.noRetry;

	const retry = (newToken) => {
		if (retryAttempt > MAX_RETRIES) {
			throw new Error('Attempted to retry request multiple times.');
		}

		// Add timeout so that we aren't hitting the API as fast
		// as we can
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				apiFetch(url, {
					...options,
					headers: {
						...options.headers,
						Authorization: `Bearer ${newToken}`,
					},
					retryAttempt: retryAttempt + 1,
				}).then(resolve)
					.catch(reject);
			}, 100 * retryAttempt);
		});
	};

	const promise = fetch(url, options).then(response => {
		if (response.ok) {
			return response.json();
		}

		return response.json().then(async (payload) => {
			/*
			 * Sometimes the AWS API Gateway will RANDOMLY return 502 Bad Gateways
			 */
			if (response.status === 502) {
				const token = getStore().getState().session.accessToken;
				return retry(token);
			}

			if (response.status === 403 && payload.message === 'You do not have access to the workspace you are logging into') {
				getStore().dispatch(logout());
				throw new Error(payload.message);
				// return;
			}

			if (response.status === 403 && payload.message === 'Please sign up for an account before logging in') {
				getStore().dispatch(logout());
				throw new Error(payload.message);
				// return;
			}

			if ((response.status === 400 && payload.message === 'Missing Authorization header') ||
                (response.status === 401 && payload.message === 'A valid token was not provided') ||
                (response.status === 401 && payload.message === 'Invalid algorithm')) {
				getStore().dispatch(logout());
				throw new Error(payload.message);
				// return;
			}

			if (!noRetry && response.status === 401 && payload.message === 'Expired token') {
				try {
					const { accessToken } = await getStore().dispatch(refresh());

					return retry(accessToken);
				} catch (e) {
					// can't refresh
					getStore().dispatch(logout());
				}
			}

			// eslint-disable-next-line no-throw-literal
			throw {
				status: response.status,
				message: payload,
			};
		});
	});

	if (options.method === 'GET' || !options.method) {
		setInFlightRequest(url, options, promise, TIMEOUT);
	}

	return promise;
};

const BaseApi = {
	get(url, options) {
		return apiFetch(BASE_URL + url, {
			headers: generateHeaders(options),
			noRetry: options.noRetry || false,
		});
	},
	post(url, payload, options) {
		return apiFetch(BASE_URL + url, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: generateHeaders(options),
			noRetry: options.noRetry || false,
		});
	},
	patch(url, payload, options) {
		return apiFetch(BASE_URL + url, {
			method: 'PATCH',
			body: JSON.stringify(payload),
			headers: generateHeaders(options),
			noRetry: options.noRetry || false,
		});
	},
	put(url, payload, options) {
		return apiFetch(BASE_URL + url, {
			method: 'PUT',
			body: JSON.stringify(payload),
			headers: generateHeaders(options),
			noRetry: options.noRetry || false,
		});
	},
	delete(url, options) {
		return apiFetch(BASE_URL + url, {
			method: 'DELETE',
			headers: generateHeaders(options),
			noRetry: options.noRetry || false,
		});
	},
};

export default function getBaseApi() {
	return BaseApi;
}
