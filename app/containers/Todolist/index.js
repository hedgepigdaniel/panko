// createWrapper
import { createWrapper } from 'components/Bundle/index.jsx'

// Constants
import {
  MODAL_TYPES,
} from './constants.js'

// Component & reducer
import reducer from './reducer.js'
import Todolist from './Todolist.jsx'

// Modals
import EditModal from './EditModal.jsx'

// Export component loader
export default createWrapper(Todolist, {
  reducer: { name: 'todolist', reducer },
  modals: [
    {
      type: MODAL_TYPES.EDIT_ITEM,
      component: EditModal,
    },
  ],
})
