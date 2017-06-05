import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeModal } from './actions';

const types = {};

class _ModalProvider extends Component {

  static propTypes = {
    type: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    type: '',
  }

  static childContextTypes = {
    addModalTypes: PropTypes.func,
  }

  getChildContext() {
    return {
      addModalTypes: (newTypes) => {
        newTypes.forEach((type) => {
          types[type.type] = type;
        });
      },
    };
  }

  renderModal() {
    // Retrieve dynamic modal content
    if (this.props.type) {
      const ModalContent = types[this.props.type].component;
      return (
        <ModalContent closeModal={this.props.closeModal} />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        { this.props.children }
        { this.renderModal() }
      </div>
    );
  }
}

export default connect(
  state => ({
    type: state.getIn(['modal', 'type']),
    props: state.getIn(['modal', 'props']),
  }),
  dispatch => bindActionCreators({ closeModal }, dispatch),
)(_ModalProvider);
