export default {
	domain: process.env.REACT_APP_AUTH0_DOMAIN,
	client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
	scope: 'openid email profile',
};
