import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';


import { NAVIGATE_HOME, NAVIGATE_TODOLIST } from 'routes.jsx';


/**
 * Root application component
 * Include top level routing on modules
 *
 * @return {ReactElement} markup
 */

const Root = () => {
  return (
    <div>
      <ul>
        <li><Link to={{ type: NAVIGATE_HOME }}>Home</Link></li>
        <li><Link to={{ type: NAVIGATE_TODOLIST }}>Todolist</Link></li>
      </ul>
    </div>
  );
};

export default connect(
  () => {
    return {
    };
  },
)(Root);
