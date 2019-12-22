// TODO: Alphabetize this everywhere
import { applyMiddleware, combineReducers, createStore } from 'redux'
// TODO: Replace Thunk with Saga in all projects
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer } from './reducer'
// import zakSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({ app: reducer })

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  )
)

// sagaMiddleware.run(zakSaga)

export type RootState = ReturnType<typeof rootReducer>

export default store
