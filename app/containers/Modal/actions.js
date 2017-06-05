import {
  UPDATE_MODAL,
  HIDE_MODAL,
} from './constants';

export function updateModal(props) {
  return {
    type: UPDATE_MODAL,
    payload: props,
  };
}

export function closeModal() {
  return {
    type: HIDE_MODAL,
  };
}
