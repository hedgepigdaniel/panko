import React from 'react';
import PropTypes from 'prop-types';

import { injectAsyncReducer } from 'utils/asyncInjectors.jsx';

import Bundle from './Bundle.jsx';

/**
 * LazyBundle component generator
 * @param  {Promise} loader Promise resolving loaded module
 * @return {ReactElement}   Component
 */
export function lazyBundle(loader) {
  return function LazyBundle() {
    return (
      <Bundle loader={loader}>
        { Comp => (<Comp />) }
      </Bundle>
    );
  };
}

/**
 * Create a component wrapper, injecting the reducer before mounting the component
 * @param  {ReactElement} DecoratedComponent   Component to mount
 * @param  {Object} data              Data to inject
 * @return {ReactElement}             Component
 */
export function createWrapper(DecoratedComponent, data) {
  function Wrapper(props, { store, addModalTypes }) {
    // Inject provided reducer
    const { reducer: { name: reducerName, reducer }, modals } = data;
    injectAsyncReducer(store)(reducerName, reducer);

    // Inject provided modals
    addModalTypes(modals);

    return <DecoratedComponent />;
  }

  Wrapper.contextTypes = {
    store: PropTypes.object,
    addModalTypes: PropTypes.func,
  };

  return Wrapper;
}
