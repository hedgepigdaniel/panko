import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'


/**
 * ModalProvider
 * It should be wrapping the ConnectedRouter as redux's
 * connect prevent props propagation
 */
import ModalProvider from 'containers/Modal/index.jsx'

// Redux store configurator
import configureStore from './store'

// App root component
import Root from './containers/Root/index.jsx'

// App css
import './index.scss'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Create redux store with initial state and history
const store = configureStore({}, history)

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Provider store={store}>
          <ModalProvider>
            <ConnectedRouter history={history}>
              <Component />
            </ConnectedRouter>
          </ModalProvider>
        </Provider>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root)

if (module.hot) {
  module.hot.accept('./containers/Root/index.jsx', () => {
    render(Root)
  })
}
