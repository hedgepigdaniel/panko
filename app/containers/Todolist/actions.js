/*
 * Todolist Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
   SHOW_MODAL,
 } from 'containers/Modal/constants'
import {
  CHANGE_NEW_ITEM_VALUE,
  ADD_ITEM,
  MARK_AS_DONE,
  MARK_AS_UNDONE,
  EDIT_ITEM,

  MODAL_TYPES,
} from './constants'


export function changeNewItemValue (value) {
  return {
    type: CHANGE_NEW_ITEM_VALUE,
    payload: value,
  }
}

export function addItem (item) {
  return {
    type: ADD_ITEM,
    payload: item,
  }
}

export function markAsDone (item) {
  return {
    type: MARK_AS_DONE,
    payload: item,
  }
}

export function editItem (item) {
  return {
    type: EDIT_ITEM,
    payload: item,
  }
}

export function markAsUndone (item) {
  return {
    type: MARK_AS_UNDONE,
    payload: item,
  }
}

export function editItemDialog (item) {
  return {
    type: SHOW_MODAL,
    payload: {
      type: MODAL_TYPES.EDIT_ITEM,
      props: item,
    },
  }
}
