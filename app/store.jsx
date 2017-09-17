import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { connectRoutes } from 'redux-first-router';
import { fromJS } from 'immutable';
import createHistory from 'history/createBrowserHistory';

import { routesMap } from './routes.jsx';

const history = createHistory();

const {
  reducer: routerReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
} = connectRoutes(history, routesMap, { location: state => state.get('location') });

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
function createReducer(asyncReducers) {
  return combineReducers({
    location: routerReducer,
    ...asyncReducers,
  });
}

export default function configureStore(initialState = {}) {
  // Create the store with middlewares
  // 1. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    routerMiddleware,
  ];

  const enhancers = [
    routerEnhancer,
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle,no-undef */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  // Extensions
  store.asyncReducers = {}; // Async reducer registry

  return store;
}
