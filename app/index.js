import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

// External css
import 'snacky/build/index.css'

/**
 * ModalProvider
 * It should be wrapping the ConnectedRouter as redux's
 * connect prevent props propagation
 */
import ModalProvider from 'containers/Modal'

// Redux store configurator
import configureStore from './store'

// App root component
import Root from './containers/Root'

// App css
import './index.scss'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

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
  module.hot.accept('./containers/Root', () => {
    render(Root)
  })
}
