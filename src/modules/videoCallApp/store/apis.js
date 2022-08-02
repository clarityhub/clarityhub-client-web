const BASE_URL = process.env.REACT_APP_API_BASE;

export default {
	get(shortId, password) {
		const url = `${BASE_URL}/public/videoCalls/${shortId}/actions/get`;
		const options = {
			method: 'POST',
			body: JSON.stringify({
				password,
			}),
		};

		return fetch(url, options).then(response => {
			return response.json().then((payload) => {
				if (response.status >= 300) {
					throw new Error(payload.message);
				}

				return payload;
			});
		});
	},

	join(shortId, payload) {
		const url = `${BASE_URL}/public/videoCalls/${shortId}/actions/join`;
		const options = {
			method: 'POST',
			body: JSON.stringify(payload),
		};

		return fetch(url, options).then(response => {
			return response.json().then((payload) => {
				if (response.status >= 300) {
					throw new Error(payload.message);
				}

				return payload;
			});
		});
	},
};
