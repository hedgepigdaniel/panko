import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root/index.jsx';
// Redux store configurator
import configureStore from './store.jsx';
import './index.scss';


const store = configureStore({});

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),  // eslint-disable-line no-undef
  );
};

render(Root);
