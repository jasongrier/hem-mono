import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import { reducer as appReducer } from './reducer'
import { loginCheckSaga, loginSaga, logoutSaga } from './sagas'

import { reducer as playerReducer } from '../components/packages/website-player/reducer'

const rootReducer = combineReducers({
  app: appReducer,
  player: playerReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  )
)

sagaMiddleware.run(loginCheckSaga)
sagaMiddleware.run(loginSaga)
sagaMiddleware.run(logoutSaga)

export type RootState = ReturnType<typeof rootReducer>

export default store
