import React from 'react';
import { Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { StripeProvider } from 'react-stripe-elements';
import { ToastManagerProvider } from '@clarityhub/unity-web/lib/contexts/ToastManager';
import { getLocale, DEFAULT_LOCALE, LocaleContextProvider } from '@clarityhub/unity-web/lib/contexts/Localization';
import history from './history';
import configureStore from './store';
import { ServiceProvider } from './services';
import { Auth0Provider } from './services/Auth0';
import auth0Config from './configs/auth0';
import GoogleAnalytics from './services/GoogleAnalytics';
import MobileCheck from './modules/app/components/MobileCheck';
import ErrorBoundary from './modules/app/errors/ErrorBoundary';
import IfAuthenticated from './modules/auth/containers/IfAuthenticated';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnauthenticatedRoutes from './UnauthenticatedRoutes';
import { FlagsProvider } from './modules/app/components/Flags';
import flags from './configs/flags';

import './global.css';

const onRedirectCallback = appState => {
	localStorage.setItem('redirectAfterLogin', appState.redirectUrl);
	history.push(
		appState && appState.targetUrl
			? appState.targetUrl
			: '/auth/callback',
	);
};

const store = configureStore({
	storePaths: ['session'],
	beforeSave: (state) => {
		return {
			...state,
			session: {
				...state.session,
				isLoggingIn: false,
			},
		};
	},
	version: '1.2',
});

const App = () => {
	return (
		<div style={{ height: '100vh', width: '100%', display: 'flex ' }}>
			<FlagsProvider flags={flags}>
				<ReduxProvider store={store}>
					<LocaleContextProvider value={getLocale(DEFAULT_LOCALE)}>
						<Helmet>
							<meta charset="utf-8" />
						</Helmet>

						<Auth0Provider
							{...auth0Config}
							redirect_uri={window.location.origin}
							onRedirectCallback={onRedirectCallback}
						>
							<ServiceProvider>
								<ErrorBoundary fullPage>
									<Router history={history}>
										<GoogleAnalytics trackingId={process.env.REACT_APP_GA_TRACKING_ID}>
											<StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
												<ToastManagerProvider>
													<MobileCheck />
													<IfAuthenticated
														render={AuthenticatedRoutes}
														fallback={UnauthenticatedRoutes}
													/>
												</ToastManagerProvider>
											</StripeProvider>
										</GoogleAnalytics>
									</Router>
								</ErrorBoundary>
							</ServiceProvider>
						</Auth0Provider>
					</LocaleContextProvider>
				</ReduxProvider>
			</FlagsProvider>
		</div>
	);
};

export default App;
