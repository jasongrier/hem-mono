import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { reducer } from './reducer'
import { loginCheckSaga, loginSaga, logoutSaga } from './sagas'

const rootReducer = combineReducers({ app: reducer })
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
