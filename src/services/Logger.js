import React from 'react';
import bugsnagReact from '@bugsnag/plugin-react';
import bugsnag from '@bugsnag/js';
import { version } from '../../package.json';

const setupBugsnag = () => {
	if (process.env.BUGSNAG_API_KEY && process.env.NODE_ENV !== 'test') {
		const bugsnagClient = bugsnag({
			apiKey: process.env.BUGSNAG_API_KEY,
			appVersion: version,
			notifyReleaseStages: ['production'],
			releaseStage: process.env.NODE_ENV,
		});

		bugsnagClient.use(bugsnagReact, React);

		return bugsnagClient;
	}

	return null;
};

let client = null;

export default function Logger() {
	if (!client) {
		client = setupBugsnag();
	}

	return {
		info: (...args) => {
			// eslint-disable-next-line no-console
			console.info(...args);
		},
		log: (...args) => {
			// eslint-disable-next-line no-console
			console.log(...args);
		},
		error: (error) => {
			// eslint-disable-next-line no-console
			console.error(error);

			if (client) {
				client.notify(error);
			}
		},
	};
}
