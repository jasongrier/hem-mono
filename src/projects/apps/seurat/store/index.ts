import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from './reducer'

const rootReducer = combineReducers({ app: reducer })

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
)

export type RootState = ReturnType<typeof rootReducer>

export default store
