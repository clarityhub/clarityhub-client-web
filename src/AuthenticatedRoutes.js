import React, { Fragment, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loading from '@clarityhub/unity-web/lib/components/Loading';

import Dashboard from './modules/dashboards/pages/Dashboard';
import CreateNotebook from './modules/notebooks/pages/CreateNotebook';
import ViewMedia from './modules/medias/pages/ViewMedia';
import ViewNotebook from './modules/notebooks/pages/ViewNotebook';
import Notebooks from './modules/notebooks/pages/Notebooks';
import Interviews from './modules/interviews/pages/Interviews';
import CreateInterview from './modules/interviews/pages/CreateInterview';
import ViewInterview from './modules/interviews/pages/ViewInterview';
import AppLayout from './modules/app/layouts/AppLayout';
import PickWorkspace from './modules/workspaces/pages/PickWorkspace';
import BeforeLeave from './modules/recordings/containers/BeforeLeave';
import AccountLanding from './modules/workspaces/pages/Settings';
import ViewAnnouncements from './modules/announcements/pages/ViewAnnouncements';
import Tags from './modules/tags/pages/Tags';

const VideoCall = React.lazy(() => import('./modules/videoCallApp/pages/VideoCall'));

const Routes = () => {
	return (
		<Fragment>
			<BeforeLeave />
			<Switch>
				<Route path="/workspaces/pick" exact component={PickWorkspace} />
				<Route path="/v/:shortId" exact render={(props) => (
					<Suspense fallback={() => <Loading flex size={2} />}>
						<VideoCall {...props} isAdmin />
					</Suspense>
				)} />

				<Route render={() => (
					<AppLayout>
						<Switch>
							<Route path="/" exact component={Dashboard} />
							<Route path="/announcements" exact component={ViewAnnouncements} />
							<Route path="/workspaces/pick" exact render={() => <div />} />
							<Route path="/medias/:mediaId" exact component={ViewMedia} />

							<Route path="/notebooks" exact component={Notebooks} />
							<Route path="/notebooks/create" exact component={CreateNotebook} />
							<Route path="/notebooks/:notebookId" exact component={ViewNotebook} />

							<Route path="/interviews" exact component={Interviews} />
							<Route path="/interviews/create" exact component={CreateInterview} />
							<Route path="/interviews/:interviewId" exact component={ViewInterview} />

							<Route path="/settings" component={AccountLanding} />
							<Route path="/tags" component={Tags} />

							<Route render={() => <Redirect to="/" />} />
						</Switch>
					</AppLayout>
				)} />
			</Switch>
		</Fragment>
	);
};

export default Routes;
