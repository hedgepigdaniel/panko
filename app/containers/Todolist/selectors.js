// import { createSelector } from 'reselect'

function itemsSelector (state) {
  return state.get('items')
}

function newItemValueSelector (state) {
  return state.get('newItemValue')
}

export default state => {
  const todolistState = state.get('todolist')

  return {
    items: itemsSelector(todolistState),
    newItemValue: newItemValueSelector(todolistState),
  }
}
