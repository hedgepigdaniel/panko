import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import withProgressBar from 'components/ProgressBar'

// Static containers
import Login from 'containers/Login'

// Bundle loader
import { lazyBundle } from 'components/Bundle'

// Todolist container
const Todolist = lazyBundle(() => import(/* webpackChunkName: "module-todolist" */ 'containers/Todolist'))

/**
 * Root application component
 * Include top level routing on modules
 *
 * @return {ReactElement} markup
 */

function Root () {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/todolist">Todolist</Link></li>
      </ul>

      <hr />
      <Switch>
        <Route path="/todolist" component={Todolist} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  )
}

export default withProgressBar(Root)
