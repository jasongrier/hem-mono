import { combineReducers } from 'redux'
import { reducer as appReducer } from '../app'
import { oneReducer, twoReducer } from '../app/components'

const rootReducer = combineReducers({
  app: appReducer,
  one: oneReducer,
  two: twoReducer,
})

export default rootReducer
