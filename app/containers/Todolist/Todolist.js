import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import snacky from 'snacky'

import {
  List,
  ListItem,
} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'

import IconEdit from 'icons/edit.svg'

// Import actions
import {
  addItem,
  changeNewItemValue,
  markAsDone,
  markAsUndone,
  editItemDialog,
} from './actions'

// Selectors
import selectors from './selectors'

@connect(
  selectors,
  dispatch => ({
    changeNewItemValue: value => dispatch(changeNewItemValue(value)),
    addItem: item => dispatch(addItem(item)),
    markAsDone: item => dispatch(markAsDone(item)),
    markAsUndone: item => dispatch(markAsUndone(item)),
    editItemDialog: item => dispatch(editItemDialog(item)),
  })
)
export default class Todolist extends PureComponent {

  static propTypes = {
    items: ImmutablePropTypes.list.isRequired,
    newItemValue: PropTypes.string.isRequired,
    changeNewItemValue: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    markAsDone: PropTypes.func.isRequired,
    markAsUndone: PropTypes.func.isRequired,
    editItemDialog: PropTypes.func.isRequired,
  }

  @autobind
  changeNewItemValue (event) {
    this.props.changeNewItemValue(event.target.value)
  }

  @autobind
  toggleCheckbox (item) {
    if (item.get('done') === false) {
      this.props.markAsDone(item)
    } else {
      this.props.markAsUndone(item)
    }
  }

  @autobind
  editItemDialog (item, event) {
    event.stopPropagation()
    this.props.editItemDialog(item)
  }

  @autobind
  submitForm (e) {
    e.preventDefault()
    this.props.addItem(this.props.newItemValue)
    snacky(`${this.props.newItemValue} added`)
  }

  render () {
    const { items } = this.props

    return (
      <div>
        Todolist as a bundle :)
        <List>
          {items.map(item => (
            <ListItem
              key={item.get('id')}

              leftCheckbox={
                <Checkbox
                  checked={item.get('done')}
                  onClick={() => this.toggleCheckbox(item)}
                  tabIndex="-1"
                />
              }
              primaryText={item.get('name')}
              rightIconButton={
                <IconButton onClick={event => this.editItemDialog(item, event)}>
                  <IconEdit />
                </IconButton>
              }
              style={{ color: '#F00' }}
            />
          ))}
        </List>
        <hr />
        <form onSubmit={this.submitForm}>
          <TextField value={this.props.newItemValue} onChange={this.changeNewItemValue} name="new-item" />
          <Button type="submit">Add item</Button>
        </form>
      </div>
    )
  }
}
