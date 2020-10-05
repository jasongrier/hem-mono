import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { popupsReducer } from '../../lib/modules/popups'
import { playerReducer } from '../../lib/modules/website-player'
import { App, appReducer } from './modules/app'
import './styles'

declare const window: any

const rootReducer = combineReducers({
  app: appReducer,
  player: playerReducer,
  popups: popupsReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = window.STORE = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  )
)

import { requestActiveLiveStreamSaga } from './modules/app'
sagaMiddleware.run(requestActiveLiveStreamSaga)

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
