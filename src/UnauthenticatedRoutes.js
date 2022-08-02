import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from '@clarityhub/unity-web/lib/components/Loading';

import Auth from './modules/auth/pages/Auth';
import LoginErrorOrRedirect from './modules/auth/pages/LoginErrorOrRedirect';
import AuthCallback from './modules/auth/pages/AuthCallback';
import PickWorkspace from './modules/workspaces/pages/PickWorkspace';
import Logout from './modules/auth/pages/Logout';

const VideoCall = React.lazy(() => import('./modules/videoCallApp/pages/VideoCall'));

const UnauthenticatedApp = () => (
	<Switch>
		<Route
			exact
			path="/"
			component={LoginErrorOrRedirect}
		/>
		<Route
			exact
			path="/auth"
			component={Auth}
		/>
		<Route
			exact
			path="/auth/callback"
			component={AuthCallback}
		/>
		<Route
			path="/workspaces/pick"
			component={PickWorkspace}
		/>
		<Route
			path="/auth/logout"
			component={Logout}
		/>

		<Route path="/v/:shortId" exact render={(props) => (
			<Suspense fallback={() => <Loading flex size={2} />}>
				<VideoCall {...props} />
			</Suspense>
		)} />

		<Route
			render={() => <Redirect to="/auth" />}
		/>
	</Switch>
);

export default UnauthenticatedApp;
