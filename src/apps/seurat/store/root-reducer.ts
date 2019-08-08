import { combineReducers } from 'redux'
import { reducer as appReducer } from '../app'
import { boardReducer, clockReducer, dotReducer} from '../app/components'

const rootReducer = combineReducers({
  app: appReducer,
  board: boardReducer,
  clock: clockReducer,
  dot: dotReducer,
})

export default rootReducer
