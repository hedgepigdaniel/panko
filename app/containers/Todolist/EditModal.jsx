import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateModal } from 'containers/Modal/actions';
import { editItem } from './actions';

class _EditModal extends PureComponent {

  static propTypes = {
    item: ImmutablePropTypes.map.isRequired,
    updateModal: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  save = (event) => {
    event.preventDefault();
    this.props.editItem(this.props.item);
    this.props.closeModal();
  };

  edit = (event) => {
    const newItem = this.props.item.set('name', event.target.value);
    this.props.updateModal(newItem);
  };

  render() {
    return (
      <form onSubmit={this.save}>
        <div>{'Edit item'}</div>
        <div />
        <div />
      </form>
    );
  }
}

export default connect(
  state => ({
    item: state.getIn(['modal', 'props']),
  }),
  dispatch => bindActionCreators({ updateModal, editItem }, dispatch),
  _EditModal,
);
