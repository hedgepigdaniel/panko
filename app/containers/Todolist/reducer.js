/*
 * TodolistReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS, Map } from 'immutable';

import {
  CHANGE_NEW_ITEM_VALUE,
  ADD_ITEM,
  EDIT_ITEM,
  MARK_AS_DONE,
  MARK_AS_UNDONE,
} from './constants';


// The initial state of the component
const initialState = fromJS({
  items: [
    {
      name: 'First item in list',
      done: false,
      id: Math.random(),
    },
    {
      name: 'Second item in list',
      done: true,
      id: Math.random(),
    },
  ],
  newItemValue: '',
});


function todolistReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return state
        .set('items', state.get('items').push(Map({
          name: action.payload,
          done: false,
          id: Math.random(),
        })))
        .set('newItemValue', '');
    case CHANGE_NEW_ITEM_VALUE:
      return state
        .set('newItemValue', action.payload);
    case MARK_AS_DONE:
      return state
        .setIn([
          'items',
          state.get('items').indexOf(action.payload),
          'done',
        ], true);
    case MARK_AS_UNDONE:
      return state
        .setIn([
          'items',
          state.get('items').indexOf(action.payload),
          'done',
        ], false);
    case EDIT_ITEM: {
      const replaceIndex = action.payload.get('id');
      const index = state.get('items').findIndex(i => i.get('id') === replaceIndex);
      return state.setIn([
        'items',
        index,
      ], action.payload);
    }

    default:
      return state;
  }
}

export default todolistReducer;
