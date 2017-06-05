import { fromJS } from 'immutable';

import {
    SHOW_MODAL,
    HIDE_MODAL,
    UPDATE_MODAL,
} from './constants';


const initialState = fromJS({
  type: null,
  props: {},
});


export default function modal(state = initialState, action) {
  switch (action.type) {

    case SHOW_MODAL: {
      const { type, props } = action.payload;

      return fromJS({ type, props });
    }

    case UPDATE_MODAL:
      return state.set('props', action.payload);

    case HIDE_MODAL:
      return initialState;

    default:
      return state;
  }
}
