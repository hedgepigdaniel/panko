// createWrapper
import { createWrapper } from 'components/Bundle/index.jsx';

// Constants
import {
  MODAL_TYPES,
} from './constants.jsx';

// Component & reducer
import reducer from './reducer.jsx';
import Todolist from './Todolist.jsx';

// Modals
import EditModal from './EditModal.jsx';

// Export component loader
export default createWrapper(Todolist, {
  reducer: { name: 'todolist', reducer },
  modals: [
    {
      type: MODAL_TYPES.EDIT_ITEM,
      component: EditModal,
    },
  ],
});