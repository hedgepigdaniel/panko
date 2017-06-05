/*
 * TodolistConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_NEW_ITEM_VALUE = 'imtf/Todolist/CHANGE_NEW_ITEM_VALUE'
export const ADD_ITEM = 'imtf/Todolist/ADD_ITEM'
export const EDIT_ITEM = 'imtf/Todolist/EDIT_ITEM'
export const MARK_AS_DONE = 'imtf/Todolist/MARK_AS_DONE'
export const MARK_AS_UNDONE = 'imtf/Todolist/MARK_AS_UNDONE'

export const MODAL_TYPES = {
  EDIT_ITEM: 'imtf/Todolist/modal/EDIT_ITEM',
}
