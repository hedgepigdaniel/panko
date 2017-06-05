import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

// Root reducers
import modalReducer from 'containers/Modal/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    modal: modalReducer,
    ...asyncReducers,
  });
}
