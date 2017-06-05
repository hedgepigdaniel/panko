import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'react-router';


/**
 * ModalProvider
 * It should be wrapping the ConnectedRouter as redux's
 * connect prevent props propagation
 */
import ModalProvider from 'containers/Modal/index.jsx';

// Redux store configurator
import configureStore from './store';

// App root component
import Root from './containers/Root/index.jsx';

// App css
import './index.scss';

// Create a history of your choosing (we're using a browser history in this case)
let history = createHistory();

// Create redux store with initial state and history
const store = configureStore(history, {});

history = syncHistoryWithStore(history, store, {
  selectLocationState: state => state.get('routing'),
});

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ModalProvider>
          <Router history={history}>
            <Component />
          </Router>
        </ModalProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),  // eslint-disable-line no-undef
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./containers/Root/index.jsx', () => {
    render(Root);
  });
}
