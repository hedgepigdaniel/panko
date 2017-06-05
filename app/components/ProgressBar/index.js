import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import ProgressBar from './ProgressBar'

function withProgressBar (WrappedComponent) {
  @withRouter
  class AppWithProgressBar extends Component {

    static propTypes = {
      location: PropTypes.object.isRequired,
    }

    static childContextTypes = {
      loadStart: PropTypes.func,
      loadEnd: PropTypes.func,
    }

    state = {
      progress: -1,
      loadedRoutes: [this.props.location.pathname],
    }

    getChildContext () {
      return {
        loadStart: () => {
          if (this.state.loadedRoutes.indexOf(this.props.location.pathname) === -1) {
            this.updateProgress(0)
          }
        },
        loadEnd: () => {
          const { loadedRoutes, progress } = this.state
          const { pathname } = this.props.location

          // Complete progress when route changes. But prevent state update while re-rendering.
          if (loadedRoutes.indexOf(pathname) === -1 && progress !== -1 && this.state.progress < 100) {
            this.updateProgress(100)
            this.setState({
              loadedRoutes: loadedRoutes.concat([pathname]),
            })
          }
        },
      }
    }

    componentWillUnmount () {
      // Unset unsubscribeHistory since it won't be garbage-collected.
      this.unsubscribeHistory = undefined
    }

    @autobind
    updateProgress (progress) {
      this.setState({ progress })
    }

    render () {
      return (
        <div>
          <ProgressBar percent={this.state.progress} updateProgress={this.updateProgress} />
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }

  return AppWithProgressBar
}

export default withProgressBar
