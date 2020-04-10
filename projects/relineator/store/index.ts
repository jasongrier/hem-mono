import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer } from './reducer'
import { popupsReducer } from '../../../lib/modules/popups'

const rootReducer = combineReducers({
  app: reducer,
  popups: popupsReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
)

export type RootState = ReturnType<typeof rootReducer>

export default store
