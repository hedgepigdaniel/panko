import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

// Import actions
import {
  addItem,
  changeNewItemValue,
  markAsDone,
  markAsUndone,
  editItemDialog,
} from './actions.jsx';

// Selectors
import selectors from './selectors.jsx';

class _Todolist extends PureComponent {

  static propTypes = {
    items: ImmutablePropTypes.list.isRequired,
    newItemValue: PropTypes.string.isRequired,
    changeNewItemValue: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    markAsDone: PropTypes.func.isRequired,
    markAsUndone: PropTypes.func.isRequired,
    editItemDialog: PropTypes.func.isRequired,
  }

  changeNewItemValue = (event) => {
    this.props.changeNewItemValue(event.target.value);
  };

  toggleCheckbox = (item) => {
    if (item.get('done') === false) {
      this.props.markAsDone(item);
    } else {
      this.props.markAsUndone(item);
    }
  };

  editItemDialog = (item, event) => {
    event.stopPropagation();
    this.props.editItemDialog(item);
  };

  submitForm = (e) => {
    e.preventDefault();
    this.props.addItem(this.props.newItemValue);
  };

  render() {
    const { items } = this.props;

    return (
      <div>
        Todolist as a bundle :)
        <ul>
          {items.map(item => (
            <li
              key={item.get('id')}
              style={{ color: '#F00' }}
            />
          ))}
        </ul>
        <hr />
        <form onSubmit={this.submitForm}>
          <input type="text" value={this.props.newItemValue} onChange={this.changeNewItemValue} name="new-item" />
        </form>
      </div>
    );
  }
}

export default connect(
  selectors,
  dispatch => ({
    changeNewItemValue: value => dispatch(changeNewItemValue(value)),
    addItem: item => dispatch(addItem(item)),
    markAsDone: item => dispatch(markAsDone(item)),
    markAsUndone: item => dispatch(markAsUndone(item)),
    editItemDialog: item => dispatch(editItemDialog(item)),
  }),
)(_Todolist);
