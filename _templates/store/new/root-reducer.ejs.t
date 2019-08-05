---
to: src/<%= name %>/root-reducer.ts
---
import { combineReducers } from 'redux'
import { reducer as appReducer } from '../app'

const rootReducer = combineReducers({
  app: appReducer,
})

export default rootReducer
