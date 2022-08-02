import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import AuthTemplate from '@clarityhub/unity-web/lib/templates/AuthTemplate';

import { useAuth0 } from '../../../services/Auth0';

const MOCK_NEWS_FEED = [
	{
		title: 'Record',
		content: (
			<Fragment>
                Start recording your customer interviews and never forget a thing.
			</Fragment>
		),
	},
	{
		title: 'Collaborate',
		content: (
			<Fragment>
                Share your findings with your team and make sure everyone is on the same page.
			</Fragment>
		),
	},
];

const AuthPage = ({ location }) => {
	const { loginWithRedirect } = useAuth0();

	return (
		<AuthTemplate
			onSignUp={() => {
				loginWithRedirect({ appState: { redirectUrl: location && location.state && location.state.redirectTo } });
			}}
			onLogin={() => {
				loginWithRedirect({ appState: { redirectUrl: location && location.state && location.state.redirectTo } });
			}}
			onlyLogin
			newsFeed={MOCK_NEWS_FEED}
			termsAndConditionsHref="https://www.clarityhub.io/terms"
			privacyPolicyHref="https://www.clarityhub.io/terms/privacy/"
		/>
	);
};

export default withRouter(AuthPage);
