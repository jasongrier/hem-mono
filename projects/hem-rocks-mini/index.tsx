import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { popupsReducer } from '../../lib/modules/popups'
import { playerReducer } from '../../lib/modules/player'
import { App, appReducer } from './modules/app'
import { productsReducer } from './modules/products'
import { siteContentReducer } from './modules/site-content'
import './styles'

const rootReducer = combineReducers({
  app: appReducer,
  player: playerReducer,
  popups: popupsReducer,
  products: productsReducer,
  siteContent: siteContentReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  )
)

import { mutePlayerSaga } from '../../lib/modules/player'
sagaMiddleware.run(mutePlayerSaga)

import { pausePlayerSaga } from '../../lib/modules/player'
sagaMiddleware.run(pausePlayerSaga)

import { playPlayerSaga } from '../../lib/modules/player'
sagaMiddleware.run(playPlayerSaga)

import { unmutePlayerSaga } from '../../lib/modules/player'
sagaMiddleware.run(unmutePlayerSaga)

import { unpausePlayerSaga } from '../../lib/modules/player'
sagaMiddleware.run(unpausePlayerSaga)


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
