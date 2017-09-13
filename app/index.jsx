import React from 'react';
import ReactDOM from 'react-dom';
import ModalProvider from 'containers/Modal/index.jsx';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'react-router';
import Root from './containers/Root/index.jsx';
// Redux store configurator
import configureStore from './store.jsx';
import './index.scss';

// Create a history of your choosing (we're using a browser history in this case)
let history = createHistory();

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
