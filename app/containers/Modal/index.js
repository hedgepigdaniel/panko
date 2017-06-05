import get from 'lodash/get'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Dialog from 'material-ui/Dialog'

import { closeModal } from './actions'

const types = {}

@connect(
  state => ({
    type: state.getIn(['modal', 'type']),
    props: state.getIn(['modal', 'props']),
  }),
  dispatch => bindActionCreators({ closeModal }, dispatch)
)
export default class ModalProvider extends Component {

  static propTypes = {
    type: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: '',
  }

  static childContextTypes = {
    addModalTypes: PropTypes.func,
  }

  getChildContext () {
    return {
      addModalTypes: newTypes => {
        newTypes.forEach(type => {
          types[type.type] = type
        })
      },
    }
  }

  renderModal () {
    // Retrieve dynamic modal content
    const ModalContent = get(types[this.props.type], 'component', () => false)
    return (
      <Dialog
        open={!!this.props.type}
        actions={[]}
        onRequestClose={this.props.closeModal}
      >
        <ModalContent closeModal={this.props.closeModal} />
      </Dialog>
    )
  }

  render () {
    return (
      <div>
        { this.props.children }
        { this.renderModal() }
      </div>
    )
  }
}
