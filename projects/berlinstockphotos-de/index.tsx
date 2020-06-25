import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { App, appReducer } from './modules/app'
import './styles'

declare const window: any

const rootReducer = combineReducers({
  app: appReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = window.STORE = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  )
)

import { someActionSaga } from './modules/app'
sagaMiddleware.run(someActionSaga)


const Root = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))

export type RootState = ReturnType<typeof rootReducer>

export default store
