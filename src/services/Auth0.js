import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import auth0Config from '../configs/auth0';

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

const isRootPath = () => {
	const path = window.location.pathname;

	return path === '/' || path === '/auth';
};

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
	children,
	onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
	...initOptions
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState();
	const [user, setUser] = useState();
	const [auth0Client, setAuth0] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [popupOpen, setPopupOpen] = useState(false);

	useEffect(() => {
		const initAuth0 = async () => {
			const auth0FromHook = await createAuth0Client(initOptions);
			setAuth0(auth0FromHook);

			try {
				if (isRootPath() && window.location.search.includes('code=')) {
					const { appState } = await auth0FromHook.handleRedirectCallback();

					onRedirectCallback(appState);
				}
			} catch (e) {
				// redirect back with error
				onRedirectCallback({
					targetUrl: '/auth',
				});
			}

			// NOTE: handleRedirectCallback MUST be called before isAuthenticated
			const isAuthenticated = await auth0FromHook.isAuthenticated();
			setIsAuthenticated(isAuthenticated);

			if (isAuthenticated) {
				const user = await auth0FromHook.getUser();

				setUser(user);
			}

			setLoading(false);
		};
		initAuth0();
		// eslint-disable-next-line
    }, []);

	const loginWithPopup = async (params = {}) => {
		setError(false);
		setPopupOpen(true);
		try {
			await auth0Client.loginWithPopup(params);
		} catch (e) {
			setError(e);
		} finally {
			setPopupOpen(false);
		}
		const user = await auth0Client.getUser();
		setUser(user);
		setIsAuthenticated(true);
	};

	const handleRedirectCallback = async () => {
		setLoading(true);
		await auth0Client.handleRedirectCallback();
		const user = await auth0Client.getUser();
		setLoading(false);
		setIsAuthenticated(true);
		setUser(user);
	};

	const getIdToken = async () => {
		let claims = await auth0Client.getIdTokenClaims();

		if (!claims) {
			await loginWithPopup();
			claims = await auth0Client.getIdTokenClaims();
		}

		const token = claims.__raw;
		return token;
	};

	return (
		<Auth0Context.Provider
			value={{
				isAuthenticated,
				user,
				loading,
				error,
				popupOpen,
				loginWithPopup,
				handleRedirectCallback,
				getIdToken,
				getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
				loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
				getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
				getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
				logout: (...p) => auth0Client.logout(...p),
			}}
		>
			{children}
		</Auth0Context.Provider>
	);
};

export function Auth0() {
	return new Auth0Client(auth0Config);
}
