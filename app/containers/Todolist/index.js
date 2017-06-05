// createWrapper
import { createWrapper } from 'components/Bundle'

// Constants
import {
  MODAL_TYPES,
} from './constants'

// Component & reducer
import reducer from './reducer'
import Todolist from './Todolist'

// Modals
import EditModal from './EditModal'

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
