import React, { createContext, useContext } from 'react';
import Bottle from 'bottlejs';

import Logger from './Logger';
import Api from './Api';
import BaseApi from './BaseApi';
import Recorder from './Recorder';
import Pusher from './Pusher';
import { Auth0 } from './Auth0';

function createBottle() {
	const bottle = new Bottle();

	bottle.service('BaseApi', BaseApi);
	bottle.service('Logger', Logger);
	bottle.service('api', Api, 'BaseApi');
	bottle.service('pusher', Pusher);
	bottle.service('recorder', Recorder);
	bottle.service('Auth0', Auth0);

	return bottle;
}

export const bottle = createBottle();

const ServiceContext = createContext();

const ServiceProvider = (props) => {
	return (
		<ServiceContext.Provider value={bottle}>{props.children}</ServiceContext.Provider>
	);
};

const useServices = () => {
	const { container } = useContext(ServiceContext);

	return container;
};

const withServices = (Component) => {
	return (props) => {
		const services = useServices();

		return <Component {...props} services={services} />;
	};
};

export default ServiceContext;
export { ServiceProvider };
export { useServices };
export { withServices };
