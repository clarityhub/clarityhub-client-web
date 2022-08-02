import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import compareVersions from 'compare-versions';
import pick from 'lodash.pick';
import omitDeep from 'omit-deep';
import debounce from 'lodash.debounce';

import { bottle } from './services';
import rootReducer from './reducers';

export class StoreSerializer {
	constructor({ key, paths, ignorePaths, beforeSave, version }) {
		this.key = key;
		this.paths = paths;
		this.ignorePaths = ignorePaths;
		this.optBeforeSave = beforeSave;
		this.version = version;
	}

	checkVersion(version) {
		// if the store version is equal to the given version, then we are a-okay.
		// otherwise, it is safer to throw out the local storage
		return compareVersions(version, this.version) === 0;
	}

	getPaths(state) {
		// Only store the paths given in paths from the state
		return omitDeep(pick(state, this.paths), this.ignorePaths);
	}

	load() {
		try {
			const serializedState = localStorage.getItem(this.key);
			if (serializedState === null) {
				return undefined;
			}
			const data = JSON.parse(serializedState);

			if (!this.checkVersion(data.version)) {
				return undefined;
			}

			return data.state;
		} catch (err) {
			return undefined;
		}
	}

	beforeSave(state) {
		if (this.optBeforeSave) {
			return this.optBeforeSave(state);
		}
		return state;
	}

	save(state) {
		try {
			const serializedState = JSON.stringify({
				version: this.version,
				state: this.beforeSave(this.getPaths(state)),
			});
			localStorage.setItem(this.key, serializedState);
		} catch {
			// ignore write errors
		}
	}
}

const defaultOptions = { storeKey: 'state', version: '1.0', storePaths: [], ignorePaths: [] };
let singleStore = null;

export default function configureStore(opts) {
	const options = { ...defaultOptions, ...opts };
	const serializer = new StoreSerializer({
		key: options.storeKey,
		version: options.version,
		paths: options.storePaths,
		beforeSave: options.beforeSave,
		ignorePaths: options.ignorePaths,
	});

	const preloadedState = serializer.load();

	const middlewares = [thunkMiddleware.withExtraArgument({
		services: bottle.container,
	})];

	if (process.env.NODE_ENV === 'development') {
		const logger = require('redux-logger');

		middlewares.push(logger.default);
	}
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const enhancers = [middlewareEnhancer];
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const composedEnhancers = composeEnhancers(...enhancers);

	const store = createStore(rootReducer, preloadedState, composedEnhancers);

	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
	}

	const debouncedSerializer = debounce(() => {
		serializer.save(store.getState());
	});

	store.subscribe(debouncedSerializer);

	singleStore = store;

	return store;
}

const getStore = () => singleStore;

export { configureStore, getStore };
