import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'


import TextField from 'material-ui/TextField'
import Button from 'material-ui/FlatButton'

import { updateModal } from 'containers/Modal/actions'
import { editItem } from './actions'

@connect(
  state => ({
    item: state.getIn(['modal', 'props']),
  }),
  dispatch => bindActionCreators({ updateModal, editItem }, dispatch)
)
export default class EditModal extends PureComponent {

  static propTypes = {
    item: ImmutablePropTypes.map.isRequired,
    updateModal: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  }

  @autobind
  save (event) {
    event.preventDefault()
    this.props.editItem(this.props.item)
    this.props.closeModal()
  }

  @autobind
  edit (event) {
    const newItem = this.props.item.set('name', event.target.value)
    this.props.updateModal(newItem)
  }

  render () {
    return (
      <form onSubmit={this.save}>
        <div>{'Edit item'}</div>
        <div>
          <TextField value={this.props.item.get('name') || ''} onChange={this.edit} name="edit-item" />
        </div>
        <div>
          <Button type="submit" primary>{'Save'}</Button>
        </div>
      </form>
    )
  }
}
