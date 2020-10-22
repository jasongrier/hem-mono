import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { App, appReducer } from './modules/app'
import { projectReducer } from './modules/project'
import { filesReducer } from './modules/files'
import './styles'

declare const window: any

const rootReducer = combineReducers({
  app: appReducer,
  files: filesReducer,
  project: projectReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = window.STORE = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  )
)

import { filesSaga } from './modules/files'
sagaMiddleware.run(filesSaga)

import { projectSaga } from './modules/project'
sagaMiddleware.run(projectSaga)

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
