
import createReducer from '../reducers';


/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store) {
  return function injectReducer(name, asyncReducer) {
    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  return {
    injectReducer: injectAsyncReducer(store),
  };
}
